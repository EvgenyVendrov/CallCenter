const redisHandler = require("../utils/redisHandler");

module.exports = class CallData {

    constructor(inputFromRedis) {
        const inputFromRedisAsObj = JSON.parse(inputFromRedis);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateRedis() {
        console.sysb("new CallData data sent to Redis; lasted between:", this["time recived"], "->",this["time ended"]);
        redisHandler.sendData("callData", this);
    }
};

