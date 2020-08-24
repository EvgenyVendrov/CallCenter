const redisHandler = require("../utils/redisHandler");
const NumOfCallers = require("./NumOfCallers");

let _collection;
let _redisClient;

module.exports = class NumberOfCallers {

    static init() {
        _collection = [];
    }

    static copyFromOutputToCollection(output) {

        output.forEach((elem) => {
            const numOfCallers = new NumOfCallers(elem);
            _collection.push(numOfCallers);
        });
    }

    static getNumOfCallsFromRedis() {
        return new Promise((result, reject) => {
            redisHandler.getData("numOfCallers").then((collectionRetrieved, err) => {
                if (err) {
                    reject(err);
                }
                const tempCollection = JSON.parse(JSON.stringify(collectionRetrieved));
                tempCollection.forEach(elem => _collection.push(new NumOfCallers(elem)));
                result(_collection);

            });
        });
    }

    static getUpdatedNumberOfCallers() {
        return _isEmpty() ? 0 : _collection.slice(-1)[0].getNumOfCallers();
    }

    static addNumOfCallersInstance(numOfCallers) {
        _collection.push(numOfCallers);
    }

    static getCollection() {
        return _collection;
    }
};

const _isEmpty = () => {
    return _collection.length === 0 ? true : false;
};

