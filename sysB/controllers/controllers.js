const CallDataCollection = require("../models/CallDataCollection");
const NummberOfCallersCollection = require("../models/NumOfCallersCollection");
const socketHandler = require("../utils/socketHandler");
const WholeDay = require("../models/WholeDay");


module.exports = {
    init: () => {
        CallDataCollection.init();
        NummberOfCallersCollection.init();
        WholeDay.init();
        CallDataCollection.getCallsFromRedis()
            .then(() => {
                NummberOfCallersCollection.getNumOfCallsFromRedis();
                WholeDay.getDataFromCallDataCollection(CallDataCollection.getCollection());
                setInterval(() => {
                    const avgWatingTimeOfLast10Mins = _calcNew10MinAvg();
                    const socketIo = socketHandler.getSocket();
                    socketIo.emit("updAvgOfLast10Mins", avgWatingTimeOfLast10Mins);
                }, 60 * 1000); // 60 * 1000 milsec
                console.sysb("updating every min - set");
            })
            .catch((err) => { throw Error(err); });
    },

    getDashBoard: (req, res, next) => {
        const configObjForUi = _createConfigObjForUi();
        configObjForUi.numOfCallers = parseInt(NummberOfCallersCollection.getUpdatedNumberOfCallers());
        res.render("dashboard", configObjForUi);
    },

    numOfCallersChanged: (newNum) => {
        const socketIo = socketHandler.getSocket();
        socketIo.emit("updNumOfWaitingCallsRT", newNum);
        console.sysb("socket event of new num of callers emitted to client");
    },

    newCallEnded: (nCallData) => {
        const socketIo = socketHandler.getSocket();

        socketIo.emit("updCityTopicTable", {
            city: nCallData["caller city"],
            topic: nCallData["call topic"]
        });

        const relCellsOfWholeDay = WholeDay.recordCallInFiveMinuteSegment(nCallData);
        console.sysb("~ ~ ~>", "the array:");
        relCellsOfWholeDay.forEach(e => console.log(e));
        socketIo.emit("upd5minSeg", relCellsOfWholeDay);

        // socketIo.emit("updNumOfWaitingCallsRT", {
        //     newNum: parseInt(NummberOfCallersCollection.getUpdatedNumberOfCallers())
        // });

        const avgWatingTimeOfLast10Mins = _calcNew10MinAvg();
        socketIo.emit("updAvgOfLast10Mins", {
            newAvg: avgWatingTimeOfLast10Mins
        });

        socketIo.emit("updCallersByLang", {
            lang: CallDataCollection.groupByLang()
        });

        socketIo.emit("updCallersByTopic", {
            topic: CallDataCollection.groupByTopic()
        });

        socketIo.emit("updCallersByTopic", {
            topic: CallDataCollection.groupByTopic()
        });
    },

    redirect: (req, res, next) => {
        res.redirect("dashboard");
    },

};

const _createConfigObjForUi = () => {
    const cityCount = CallDataCollection.groupByCity();
    const topicCount = CallDataCollection.groupByTopic();
    const typeCount = CallDataCollection.groupByType();
    const langCount = CallDataCollection.groupByLang();
    const wholeDaySegment = WholeDay.getCollection();
    return {
        avg10mins: _calcNew10MinAvg(),
        groupedByCity: cityCount,
        groupedByTopic: topicCount,
        groupedByType: typeCount,
        groupedByLang: langCount,
        wholeDaySegment: wholeDaySegment
    };
};

const _calcNew10MinAvg = () => {
    return CallDataCollection.getAVGtimeOfCallLast10Min().length === 0
        ? 0 : CallDataCollection.getAVGtimeOfCallLast10Min();
};
