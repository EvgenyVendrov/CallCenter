const sendData = require("../utils/redisConnector");

// {
//     'type of call': 'Emergency',
//         'caller city': 'jerusalem',
//             'call topic': 'Medical',
//                 'caller language': 'hebrew',
//                     'total call time': 1.917,
//                         'time recived': '4:03'
// }

class CallData {

    constructor(inputFromRedis) {
        const inputFromRedisAsObj = JSON.parse(inputFromRedis);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
        // console.log("THISSSS=>", this);
    }

    updateRedis() {
        console.sysa(this);
        sendData.getRedisClient().rpush("callData", JSON.stringify(this), (err) => {
            if (err) {
                throw new Error(err);
            }
            else {
                console.sysa("new data sent to Redis");
            }
        });
    }



}

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

module.exports = CallData;