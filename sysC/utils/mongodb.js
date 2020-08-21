const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const PASSWORD = "Neska1994";
const USERNAME = "Evgeny";
let _mongoClient;


const connectToMongo = (callback) => {
    const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@callcenter.ivaiy.mongodb.net/callCenter?retryWrites=true&w=majority`;
    mongoClient.connect(uri, { useUnifiedTopology: true })
        .then(connectedClient => {
            _mongoClient = connectedClient.db();
            console.sysc("mongoDB is connected");
            if (callback) {
                callback(connectedClient);
            }
        })
        .catch(err => {
            throw new Error(err);
        });
};


const getDbConnection = () => {
    if (_mongoClient) {
        return _mongoClient;
    }
    throw new Error("mongo client isn't connected yet");
};

module.exports = { connectToMongo, getDbConnection };