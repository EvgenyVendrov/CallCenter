const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const PASSWORD = "Neska1994";
const USERNAME = "Evgeny";
let _mongoClient;


const connectToMongo = (callback) => {
    // mongodb + srv://Evgeny:<password>@callcenter.ivaiy.mongodb.net/<dbname>?retryWrites=true&w=majority
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

const sendData = (dateToSend, data) => {
    const mongoClient = getDbConnection();
    mongoClient.collection(dateToSend).insertOne(data);
    console.sysc("data sent to Mongo");
};

module.exports = { connectToMongo, getDbConnection, sendData };