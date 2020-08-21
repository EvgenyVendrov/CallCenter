const redis = require("redis");

const port = 6379;
const host = "0.0.0.0";
const pass = "Neska1994";
let _redisClient;

const connectRedis = (callBackFunction) => {

    const redisConfig = {

        port: port,
        host: host,
        password: pass,
    };

    _redisClient = redis.createClient(redisConfig);

    _redisClient.on("connect", () => {

        console.sysa("connected to redis");
        callBackFunction();
    });

    _redisClient.on("error", (err) => { throw new Error(err); });

};


const getRedisClient = () => {

    if (_redisClient) {
        return _redisClient;
    }
    else {
        throw new error("REDIS CLIENT IS NOT CONNECTED YET!");
    }

};

exports.connectRedis = connectRedis;
exports.getRedisClient = getRedisClient;

// redisClient.rpush("testing", ["evgenyYYY", "evgenyZZZ"], function (err) {
//     if (err) {
//         throw err; /* in production, handle errors more gracefully */
//     } else {
//         for (let i = 0; i < 2; i++) {
//             redisClient.rpop("testing", function (err, value) {
//                 if (err) {
//                     throw err;
//                 } else {
//                     console.log(value);
//                 }
//             }
//             );
//         }
//     }
// });

// console.log("ended");

//=>>>>>>>>>>>>>>>>>>>>>>>>EXAMPLE OF USING NODE - SCHEDULE FOR RESETING THE DB EVERY 00:00
// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('0 0 * * *', function () {
//     console.log('The answer to life, the universe, and everything!');
// });