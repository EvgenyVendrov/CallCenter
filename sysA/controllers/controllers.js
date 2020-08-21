const CallData = require("../models/CallData.js");
const DataSavedForClients = require("../models/DataSavedForClients");

let dataSavedForClients;

module.exports = {
    init: () => {
        dataSavedForClients = new DataSavedForClients();
    },

    clientConnected: () => {
        dataSavedForClients.clientConnected();
        console.sysa("client Connected!, there are =>", dataSavedForClients.getCurrNumOfClients(), " clients");
        return dataSavedForClients.getCurrNumOfClients();
    },

    callEnded: (rawCallData) => {
        const callData = new CallData(rawCallData);
        callData.sendToKafka();
        console.sysa("sent data to kafka");
    },

    numOfCallersChanged: (nNumOfCallers) => {
        dataSavedForClients.numOfCallersChanged(nNumOfCallers);
        console.sysa("new number of calls has been sent =>", dataSavedForClients.getCurrNumOfCallers());
        return dataSavedForClients.getCurrNumOfCallers();
    },

    situationChanged: (situation) => {
        dataSavedForClients.changeCallcenterSituation(situation);
        console.sysa("new situation is =>", dataSavedForClients.getCurrSituation());
        return dataSavedForClients.getCurrSituation();
    },

    clientDisconnected: () => {
        dataSavedForClients.clientDisconnected();
        console.sysa("client Disonnected!, there are =>", dataSavedForClients.getCurrNumOfClients(), " clients");
        return dataSavedForClients.getCurrNumOfClients();
    },

    getCallCenter: (req, res, next) => {
        res.render("callCenterIndex", {
            numOfUsers: dataSavedForClients.getCurrNumOfClients(),
            currSituation: dataSavedForClients.getCurrSituation(),
            numOfCallers: dataSavedForClients.getCurrNumOfCallers()
        });
    },

    redirectNonExistingUrl: (req, res, next) => {
        res.redirect("/sender");
    }



};



