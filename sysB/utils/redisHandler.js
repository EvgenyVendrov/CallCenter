const redis = require("redis");
// const NumOfCallers = require("../models/NumOfCallers");
// const CallData = require("../models/CallData");

const _port = 6379;
const _host = "0.0.0.0";
const _pass = "Neska1994";
let _redisClient;

module.exports = {
    connectRedis: (callBackFunction) => {

        const redisConfig = {
            port: _port,
            host: _host,
            password: _pass,
        };
        _redisClient = redis.createClient(redisConfig);
        _redisClient.on("connect", () => {
            console.sysb("connected to redis");
            callBackFunction();
        });
        _redisClient.on("error", (err) => { throw new Error(err); });
    },



    sendData: (whichList, dataToSend) => {
        const redisClient = _getRedisClient();
        redisClient.rpush(whichList, JSON.stringify(dataToSend), (err) => {
            if (err) {
                throw new Error(err);
            }
            else {
                console.sysb("sent to Redis successfully");
            }
        });
    },

    getData: (whichList) => {
        const redisClient = _getRedisClient();
        const collectionToReturn = [];
        return new Promise((result, reject) => {
            redisClient.lrange(whichList, 0, -1, (err, reply) => {
                if (err) {
                    reject(err);
                }
                else {
                    result(_copyRedisOutputToCollection(reply, collectionToReturn));

                }
            });
        });
    }
};

const _copyRedisOutputToCollection = (output, collection) => {
    output.forEach((elem) => {
        collection.push(elem);
    });
    return collection;
};

const _getRedisClient = () => {
    if (_redisClient) {
        return _redisClient;
    }
    else {
        throw new Error("REDIS CLIENT IS NOT CONNECTED YET!");
    }
};