const mongo = require("../utils/mongodb");


class CallData {

    constructor(inputFromMongo) {
        const inputFromRedisAsObj = JSON.parse(inputFromMongo);
        for (const prop in inputFromRedisAsObj) {
            this[prop] = inputFromRedisAsObj[prop];
        }
    }

    updateMongo() {
        const date = new Date().toISOString().split("T")[0];
        mongo.sendData(date, this);
    }

}


module.exports = CallData;

// async function createListing(client, newListing) {
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }