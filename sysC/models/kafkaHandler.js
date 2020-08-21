const kafkaConnector = require("../utils/kafkaConnector");
const CallData = require("./CallData");
const controllers = require("../controllers/controllers");
const CallDataCollection = require("../models/CallDataCollection");




const setListenersOnKafka = () => {
    const consumerApi = kafkaConnector.getConsumerAPI();
    consumerApi.on("data", (m) => {
        console.sysc("GOT IN DATA!");
        const nCallData = new CallData(m.value.toString());
        console.sysc("GOT DATA FROM KAFKA = >", nCallData);
        nCallData.updateMongo();
        CallDataCollection.addCallDataInstance(nCallData);
        controllers.newCallEnded(nCallData);

    });
    console.sysc("kafka listeners are set!");
};


module.exports = setListenersOnKafka;
// kafkaHandler.getConsumerAPI().on("data",
//     (m) => {
//         console.log("new data recived from kafka=>", m.value.toString());
//     });