const redisHandler = require("../utils/redisHandler");

module.exports = class NumOfCallers {
    constructor(inputFromRedis) {
        const inputFromRedisAsObj = JSON.parse(inputFromRedis);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateRedis() {
        console.sysb("new NumOfCallers data sent to Redis; change time :", this.getTimeOfChange());
        redisHandler.sendData("numOfCallers", this);
    }

    getTimeOfChange() {
        return this.timeOfChange;
    }

    getNumOfCallers() {
        return parseInt(this.numberOfCallers);
    }


};

