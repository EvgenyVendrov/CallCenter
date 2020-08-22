const sendData = require("../utils/redisConnector");

module.exports = class CallData {

    constructor(inputFromRedis) {
        const inputFromRedisAsObj = JSON.parse(inputFromRedis);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateRedis() {
        console.sysb(this);
        sendData.getRedisClient().rpush("callData", JSON.stringify(this), (err) => {
            if (err) {
                throw new Error(err);
            }
            else {
                console.sysb("new data sent to Redis");
            }
        });
    }
};

