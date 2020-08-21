const _dataSender = require("../models/kafkaSender");

let _date;

module.exports = class NumberOfCallers {

    constructor(number) {
        _date = new Date();
        this.timeOfChange = _date.getHours() + "-" + _date.getMinutes();
        this.numberOfCallers = number;
    }

    changeNumber(nNumber) {
        this.numberOfCallers = nNumber;
        _dataSender.sendDataFastLane(this);
    }

    sendToKafka() {
        _dataSender.sendDataFastLane(toSend);
    }

    getCurrNum() {
        return this.numberOfCallers;
    }


};