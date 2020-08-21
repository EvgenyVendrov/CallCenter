module.exports = class NumberOfClientsConnected {
    constructor() {
        this.number = 0;
    }

    incNumOfClients() {
        this.number++;
    }

    decNumOfClients() {
        this.number--;
    }

    getNumOfClientsConnected() {
        return this.number;
    }
};

// module.exports = NumberOfClientsConnected;