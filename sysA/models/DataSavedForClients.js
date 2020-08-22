const NumberOfClientsConnected = require("./NumberOfClientsConnected");
const CallCenterSituation = require("./CallCenterSituation");
const NumberOfCallers = require("./NumberOfCallers");


let _numberOfUsersConnected = new NumberOfClientsConnected();
let _situation = new CallCenterSituation();
let _numOfCallers = new NumberOfCallers(0);


module.exports = class DataSavedOnClients {

    clientConnected() {
        _numberOfUsersConnected.incNumOfClients();
    }

    clientDisconnected() {
        _numberOfUsersConnected.decNumOfClients();
    }

    changeCallcenterSituation(indexOfNewSituation) {
        if (isNaN(indexOfNewSituation)) {
            console.sysa("ERR: RECIVED NOT A NUMBER AS A NEW CALLERS NUMBER");
            return;
        }
        if (_situation.getCurrIndex() !== indexOfNewSituation) {
            _situation.changeIndex(indexOfNewSituation);
        }
    }

    numOfCallersChanged(number) {
        if (isNaN(number)) {
            console.sysa("ERR: RECIVED NOT A NUMBER AS A NEW CALLERS NUMBER");
        }
        else {
            _numOfCallers.changeNumber(number);
        }

    }

    getCurrNumOfClients() {
        return _numberOfUsersConnected.getNumOfClientsConnected();
    }

    getCurrNumOfCallers() {
        return _numOfCallers.getCurrNum();
    }

    getCurrSituation() {
        return _situation.getCurrIndex();
    }



};

