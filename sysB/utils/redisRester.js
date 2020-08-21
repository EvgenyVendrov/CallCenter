const schedule = require("node-schedule");
const redisHelper = require("./redisConnector");

const setFlushingOnRedis = (timeToFlush) => {
    schedule.scheduleJob(timeToFlush, () => {

        const redisClient = redisHelper.getRedisClient();
        redisClient.flushall((err, success) => {
            if (err) {
                throw new Error(err);
            }
            console.sysa("redis flushed =>", success);
        });

    });
    console.sysa(`flushing is set -> every day @ ${timeToFlush}`);
};


exports.setFlush = setFlushingOnRedis;