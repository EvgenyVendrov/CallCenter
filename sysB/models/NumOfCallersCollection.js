const redisConnector = require("../utils/redisConnector");
const NumOfCallers = require("./NumOfCallers");

let _collection;
let _redisClient;

class NumberOfCallers {

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
                    this.copyFromOutputToCollection(reply);
                    result();
                }
            });
        });
    }

    static getUpdatedNumberOfCallers() {
        return NumberOfCallers.isEmpty() ? 0 : _collection.slice(-1)[0].getNumOfCallers();
    }

    static addNumOfCallersInstance(numOfCallers) {
        _collection.push(numOfCallers);
    }

    static isEmpty() {
        return _collection.length === 0 ? true : false;
    }

    static getCollection() {
        return _collection;
    }
}



module.exports = NumberOfCallers;