const redis = require("redis");

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

    getRedisClient: () => {
        if (_redisClient) {
            return _redisClient;
        }
        else {
            throw new Error("REDIS CLIENT IS NOT CONNECTED YET!");
        }
    }
};
