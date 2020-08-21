const kafkaConnector = require("../utils/kafkaConnector");
const CallData = require("./CallData");
const NumOfCallers = require("./NumOfCallers");
const controllers = require("../controllers/controllers");
const CallDataCollection = require("../models/CallDataCollection");
const NummberOfCallersCollection = require("../models/NumOfCallersCollection");



const setListenersOnKafka = () => {
    const consumerApi = kafkaConnector.getConsumerAPI();
    consumerApi.on("data", (m) => {
        console.sysa("got data from kafka");
        if (m.value.toString().includes("type of call")) {
            const nCallData = new CallData(m.value.toString());
            nCallData.updateRedis();
            CallDataCollection.addCallDataInstance(nCallData);
            controllers.newCallEnded(nCallData);
        }
        else {
            const nNumOfCallers = new NumOfCallers(m.value.toString());
            nNumOfCallers.updateRedis();
            NummberOfCallersCollection.addNumOfCallersInstance(nNumOfCallers);
            controllers.numOfCallersChanged(nNumOfCallers.getNumOfCallers());
        }

    });

};


module.exports = setListenersOnKafka;
// kafkaHandler.getConsumerAPI().on("data",
//     (m) => {
//         console.log("new data recived from kafka=>", m.value.toString());
//     });