const sendData = require("../utils/redisConnector");

module.exports = class NumOfCallers {
    constructor(inputFromRedis) {
        const inputFromRedisAsObj = JSON.parse(inputFromRedis);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateRedis() {
        sendData.getRedisClient().rpush("numOfCallers", JSON.stringify(this), (err) => {
            if (err) {
                throw new Error(err);
            }
            else {
                console.sysb("new data sent to Redis");
            }
        });
    }

    getTimeOfChange() {
        return this.timeOfChange;
    }

    getNumOfCallers() {
        return parseInt(this.numberOfCallers);
    }


};

