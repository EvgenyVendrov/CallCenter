const FiveMinutes = require("./FiveMinutes");

let _collection;

module.exports = class WholeDay {

    static init() {
        _collection = [];

        let hour = "00";
        let minute = "00";
        for (let fiveMinuteSegment = 0; fiveMinuteSegment < 288; fiveMinuteSegment++) {
            _collection.push(new FiveMinutes(`${hour}:${minute}`));
            if (parseInt(minute) < 5) {
                minute = "0" + (parseInt(minute) + 5);
            }
            else if (parseInt(minute) < 55) {
                minute = "" + (parseInt(minute) + 5);
            }
            else {
                minute = "00";
                if (parseInt(hour) < 9) {
                    hour = "0" + (parseInt(hour) + 1);
                }
                else
                    hour = "" + (parseInt(hour) + 1);
            }
        }
    }

    static recordCallInFiveMinuteSegment(callData) {
        const startTime = callData["time recived"];
        const endTime = callData["time ended"];
        const timeTook = callData["total call time"];

        const [hourStart, minStart] = startTime.split(":");
        const [hourEnd, minEnd] = endTime.split(":");
        const indexToStart = (hourStart * 12) + (Math.floor(minStart / 5));
        const indexToEnd = (hourEnd * 12) + (Math.floor(minEnd / 5));


        for (let runningIndex = indexToStart; runningIndex <= indexToEnd; runningIndex++) {
            _collection[runningIndex].setCounter(_collection[runningIndex].getCounter() + 1);
            _collection[runningIndex].calcNewAvg(timeTook);
        }

        return JSON.parse(JSON.stringify(_collection.slice(indexToStart, indexToEnd + 1)));
    }

    static getDataFromCallDataCollection(callDataCollection) {
        for (const callData of callDataCollection) {
            WholeDay.recordCallInFiveMinuteSegment(callData);
        }
    }

    static getCollection() {
        return _collection;
    }
};

