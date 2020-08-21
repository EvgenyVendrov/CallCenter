const CallDataCollection = require("../models/CallDataCollection");
const NummberOfCallersCollection = require("../models/NumOfCallersCollection");
const setListenersOnKafka = require("../models/kafkaHandler");
const socketHandler = require("../utils/socketHandler");
const WholeDay = require("../models/WholeDay");



exports.init = () => {
    CallDataCollection.init();
    NummberOfCallersCollection.init();
    WholeDay.init();
    CallDataCollection.getCallsFromRedis()
        .then(() => {
            NummberOfCallersCollection.getNumOfCallsFromRedis();
            WholeDay.getDataFromCallDataCollection(CallDataCollection.getCollection());
            setInterval(() => {
                const avgWatingTimeOfLast10Mins = calcNew10MinAvg();
                const socketIo = socketHandler.getSocket();
                socketIo.emit("10mins", avgWatingTimeOfLast10Mins);
            }, 60 * 1000); // 60 * 1000 milsec
            console.sysa("updating every min - set");
        })
        .catch((err) => { throw Error(err); });

};

exports.getDashBoard = (req, res, next) => {
    const configObjForUi = createConfigObjForUi();
    configObjForUi.numOfCallers = parseInt(NummberOfCallersCollection.getUpdatedNumberOfCallers());
    res.render("dashboard2", configObjForUi);
};

exports.numOfCallersChanged = (newNum) => {
    const socketIo = socketHandler.getSocket();
    socketIo.emit("updNumOfCallers", newNum);
    console.sysa("socket event of new num of callers emitted to client");
};

exports.newCallEnded = (nCallData) => {
    const socketIo = socketHandler.getSocket();
    WholeDay.recordCallInFiveMinuteSegment(nCallData);
    socketIo.emit("newCallEnded");
};

exports.redirect = (req, res, next) => {
    res.redirect("dashboard");
};

exports.get404Err = (req, res, next) => {
    res.status(404);
    res.render("not-found");
};

const createConfigObjForUi = () => {

    const cityCount = CallDataCollection.groupByCity();
    const topicCount = CallDataCollection.groupByTopic();
    const typeCount = CallDataCollection.groupByType();
    const langCount = CallDataCollection.groupByLang();
    const wholeDaySegment = WholeDay.getCollection();



    return {
        avg10mins: calcNew10MinAvg(),
        groupedByCity: cityCount,
        groupedByTopic: topicCount,
        groupedByType: typeCount,
        groupedByLang: langCount,
        wholeDaySegment: wholeDaySegment
    };
};

const calcNew10MinAvg = () => {
    return CallDataCollection.getAVGtimeOfCallLast10Min().length === 0
        ? 0 : CallDataCollection.getAVGtimeOfCallLast10Min();
};
