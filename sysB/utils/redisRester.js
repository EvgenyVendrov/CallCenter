const schedule = require("node-schedule");
const redisHelper = require("./redisHandler");
const socketHandler = require("../utils/socketHandler");


module.exports = setFlushingOnRedis = (timeToFlush) => {
    schedule.scheduleJob(timeToFlush, () => {
        const redisClient = redisHelper.getRedisClient();
        redisClient.flushall((err, success) => {
            if (err) {
                throw new Error(err);
            }
            console.sysb("redis flushed =>", success);
            socketHandler.getSocket().emit("resetUI");
        });

    });
    console.sysb(`flushing is set -> every day @ ${timeToFlush}`);
};

