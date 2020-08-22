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
        if (callData) {
            callData.sendToKafka();
            console.sysa("sent data to kafka");
        }
        else {
            console.sysa("ERR: RECIVED NOT VALID CALL DATA");
        }

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
        console.sysa("got to render");
        res.render("callCenterIndex", {
            numOfUsers: dataSavedForClients.getCurrNumOfClients(),
            currSituation: dataSavedForClients.getCurrSituation(),
            numOfCallers: dataSavedForClients.getCurrNumOfCallers()
        });
    },

    redirectNonExistingUrl: (req, res, next) => {
        console.sysa("got to redirect");
        res.redirect(301, "/sender");
    }



};



