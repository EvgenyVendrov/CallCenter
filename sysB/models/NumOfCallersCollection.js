const redisConnector = require("../utils/redisConnector");
const NumOfCallers = require("./NumOfCallers");

let _collection;
let _redisClient;

module.exports = class NumberOfCallers {

    static init() {
        _collection = [];
        _redisClient = redisConnector.getRedisClient();
    }

    static copyFromOutputToCollection(output) {

        output.forEach((elem) => {
            const numOfCallers = new NumOfCallers(elem);
            _collection.push(numOfCallers);
        });
    }

    static getNumOfCallsFromRedis() {
        return new Promise((result, reject) => {
            _redisClient.lrange("numOfCallers", 0, -1, (err, reply) => {
                if (err) {
                    reject(err);
                }
                else {
                    NumberOfCallers.copyFromOutputToCollection(reply);
                    result();
                }
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

