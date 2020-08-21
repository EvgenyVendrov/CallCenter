const redisConnector = require("../utils/redisConnector");
const CallData = require("./CallData");

let _collection;
let _redisClient;

class CallDataCollection {

    static init() {
        _collection = [];
        _redisClient = redisConnector.getRedisClient();
    }

    static copyRedisOutputToCollection(output) {
        output.forEach((elem) => {
            const callData = new CallData(elem);
            _collection.push(callData);
        });
    }

    static getCallsFromRedis() {
        return new Promise((result, reject) => {
            _redisClient.lrange("callData", 0, -1, (err, reply) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.copyRedisOutputToCollection(reply);
                    result();
                }
            });
        });
    }

    static addCallDataInstance(callData) {
        _collection.push(callData);
    }


    static getAVGtimeOfCallLast10Min() {
        try {
            return _collection
                .filter(callData => this.isLessThan10Minutes(callData))
                .map(callData => callData["total call time"])
                .reduce((accumulator, currentValue) => accumulator + currentValue)
                / _collection.length;
        }
        catch (e) {
            if (e.message === "Reduce of empty array with no initial value") {
                return [];
            }
            else throw new Error(e);
        }
    }

    static isLessThan10Minutes(callDataElem) {
        const date = Date.now();
        const dateTimeFormat = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "numeric" ,hour12: false});
        let [{ value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date);
        hour = parseInt(hour);
        minute = parseInt(minute);
        const [callHour, callMinute] = callDataElem["time recived"].split(":");
        console.sysa("call hour=>", callHour);
        console.sysa("call min=>", callMinute);
        console.sysa("return hour:", hour - callHour);
        console.losysag("return min:", minute - callMinute);
        return ((hour - callHour === 0) && (minute - callMinute <= 10));

    }

    static groupByCity() {
        return CallDataCollection.isEmpty() ? [] : _collection.map(elem => elem["caller city"]).reduce((running, callerCity) =>
            (running[callerCity] ?
                running[callerCity] = running[callerCity] + 1 : running[callerCity] = 1, running), {});
    }

    static groupByTopic() {
        return CallDataCollection.isEmpty() ? [] : _collection.map(elem => elem["call topic"]).reduce((running, callerCity) =>
            (running[callerCity] ?
                running[callerCity] = running[callerCity] + 1 : running[callerCity] = 1, running), {});
    }

    static groupByType() {
        return CallDataCollection.isEmpty() ? [] : _collection.map(elem => elem["type of call"]).reduce((running, callerCity) =>
            (running[callerCity] ?
                running[callerCity] = running[callerCity] + 1 : running[callerCity] = 1, running), {});
    }

    static groupByLang() {
        return CallDataCollection.isEmpty() ? [] : _collection.map(elem => elem["caller language"]).reduce((running, callerCity) =>
            (running[callerCity] ?
                running[callerCity] = running[callerCity] + 1 : running[callerCity] = 1, running), {});
    }

    static isEmpty() {
        return _collection.length === 0 ? true : false;
    }

    static getCollection() {
        return _collection;
    }
}

//{ "type of call": "Emergency","caller city": "jerusalem","call topic": "Medical","caller language": "hebrew","total call time": 2.491
// }




module.exports = CallDataCollection;
// client.lrange('frameworks', 0, -1, function (err, reply) {
//     console.log(reply); // ['angularjs', 'backbone']
// });