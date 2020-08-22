module.exports = class FiveMinutes {

    constructor(hour) {
        this.hour = hour;
        this.callCounter = 0;
        this.allWaitingTimes = [];
        this.avgWaitingTime = 0;
    }

    getHour() {
        return this.hour;
    }

    getCounter() {
        return this.callCounter;
    }

    getAvgWaitingTime() {
        return this.avgWaitingTime;
    }

    setCounter(counter) {
        this.callCounter = counter;
    }

    calcNewAvg(callTime) {
        this.allWaitingTimes.push(callTime);
        const sum = this.allWaitingTimes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        this.avgWaitingTime = sum / this.callCounter;
        return this.avgWaitingTime;
    }
};

