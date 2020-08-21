const sendData = require("../utils/redisConnector");

class NumOfCallers {
    //{"timeOfChange":"14-45","numberOfCallers":4}
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
                console.sysa("new data sent to Redis");
            }
        });
    }

    getTimeOfChange() {
        return this.timeOfChange;
    }

    getNumOfCallers() {
        return parseInt(this.numberOfCallers);
    }


}

module.exports = NumOfCallers;