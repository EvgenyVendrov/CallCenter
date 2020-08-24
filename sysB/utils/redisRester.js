const schedule = require("node-schedule");
const redisHelper = require("./redisHandler");

module.exports = setFlushingOnRedis = (timeToFlush) => {
    schedule.scheduleJob(timeToFlush, () => {
        const redisClient = redisHelper.getRedisClient();
        redisClient.flushall((err, success) => {
            if (err) {
                throw new Error(err);
            }
            console.sysb("redis flushed =>", success);
        });

    });
    console.sysb(`flushing is set -> every day @ ${timeToFlush}`);
};

