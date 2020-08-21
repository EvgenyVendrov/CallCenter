const mongo = require("../utils/mongodb");


class CallData {

    constructor(inputFromMongo) {
        const inputFromRedisAsObj = JSON.parse(inputFromMongo);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateMongo() {
        // console.log(this);
        const date = new Date().toISOString().split("T")[0];
        const mongoClient = mongo.getDbConnection();
        mongoClient.collection(date).insertOne(this);
        console.sysc("data sent to Mongo");
    }

}


module.exports = CallData;

// async function createListing(client, newListing) {
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }