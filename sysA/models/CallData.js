const sendData = require("./kafkaSender.js");


module.exports = class CallData {

    constructor(rawCallData) {
        this["type of call"] = rawCallData.typeOfCall;//->
        this["caller city"] = rawCallData.city;//->
        this["call topic"] = rawCallData.topic;//->
        this["caller language"] = rawCallData.language;//->
        this["callers gender"] = rawCallData.gender;
        this["callers age"] = rawCallData.age;
        this["total call time"] = rawCallData.totalTime;//->
        this["time recived"] = rawCallData.timeRecived;
        this["time ended"] = rawCallData.timeEnded;
    }

    getDataForFastLane() {
        return {
            ["type of call"]: this["type of call"],
            ["caller city"]: this["caller city"],
            ["call topic"]: this["call topic"],
            ["caller language"]: this["caller language"],
            ["total call time"]: this["total call time"],
            ["time recived"]: this["time recived"],
            ["time ended"]: this["time ended"]
        };
    }

    getDataForSlowLane() {
        return this;
    }

    sendToKafka() {
        sendData.sendDataFastLane(this.getDataForFastLane(), 0);
        sendData.sendDataSlowLane(this.getDataForSlowLane(), 0);
    }

};

