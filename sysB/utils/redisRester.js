const schedule = require("node-schedule");
const redisHelper = require("./redisHandler");
const socketHandler = require("../utils/socketHandler");
const controllers = require("../controllers/controllers");


module.exports = setFlushingOnRedis = (hourToFlush, minToFlush) => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = hourToFlush;
    rule.min = minToFlush;
    schedule.scheduleJob(rule, () => {
        redisHelper.flushAll((success) => {
            console.sysb("redis flushed =>", success);
            controllers.restart();
            socketHandler.getSocket().emit("resetUI");
        });
    });
    console.sysb(`flushing is set -> every day, @ : ${hourToFlush}:${minToFlush}`);
};

// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
// rule.hour = 17;
// rule.minute = 0;

// var j = schedule.scheduleJob(rule, function () {
//     console.log('Today is recognized by Rebecca Black!');
// });