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
       
        socketIo.emit("upd5minSeg", relCellsOfWholeDay);

        const avgWatingTimeOfLast10Mins = _calcNew10MinAvg();
        socketIo.emit("updAvgOfLast10Mins", avgWatingTimeOfLast10Mins);

        socketIo.emit("updCallersByLang", CallDataCollection.groupByLang());

        socketIo.emit("updCallersByTopic", CallDataCollection.groupByTopic());
    },

    redirect: (req, res, next) => {
        res.redirect("dashboard");
    },

};

const _createConfigObjForUi = () => {
    const cityCount = CallDataCollection.groupByCity();
    const topicCount = CallDataCollection.groupByTopic();
    const typeCount = CallDataCollection.groupByType();
    const groupByCityTopic = CallDataCollection.groupByCityTopic();
    const langCount = CallDataCollection.groupByLang();
    const wholeDaySegment = WholeDay.getCollection();
    
    return {
        avg10mins: _calcNew10MinAvg(),
        groupedByCity: cityCount,
        groupedByTopic: topicCount,
        groupedByType: typeCount,
        groupedByLang: langCount,
        groupByCityTopic: groupByCityTopic,
        wholeDaySegment: wholeDaySegment,
        date: _getCurrDateForDashBoard()
    };
};

const _calcNew10MinAvg = () => {
    return CallDataCollection.getAVGtimeOfCallLast10Min().length === 0
        ? 0 : CallDataCollection.getAVGtimeOfCallLast10Min();
};

const _getCurrDateForDashBoard = () => {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "numeric",
        day: "2-digit"
    });
    const [{ value: month }, , { value: day }, , { value: year }, , , ,] = dateTimeFormat.formatToParts(date);
    return `${day}/${month}/${year}`;
}