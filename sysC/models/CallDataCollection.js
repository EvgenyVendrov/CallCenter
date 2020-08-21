const mongoConnector = require("../utils/mongodb");
const CallData = require("./CallData");

let _collection;
let _mongoClient;

class CallDataCollection {

    static init() {
        _collection = [];
        _mongoClient = mongoConnector.getDbConnection();
    }

    static async getCallsFromMongo() {
        // console.log("GOT INNNNNNNN");
        const allCollectionNames = [];
        await CallDataCollection.getAllMongoCollectionNames(allCollectionNames);
        // console.log(allCollectionNames);
        for (let i = 0; i < allCollectionNames.length; i++) {
            await CallDataCollection.getDataFromMongo(allCollectionNames[i]);
        }
        // console.log("ZORGO=>", _collection);
    }

    static getAllMongoCollectionNames(allCollectionNames) {
        return new Promise((resolve, reject) => {
            _mongoClient.listCollections().toArray((err, collection) => {
                if (err) {
                    reject(err);
                }
                collection.forEach(elem => allCollectionNames.push(elem.name));
                resolve();
            });
        });
    }

    static getDataFromMongo(collectionName) {
        return new Promise((resolve, reject) => {
            _mongoClient.collection(collectionName).find({}).toArray((err, data) => {
                if (err) {
                    reject(err);
                }
                data.forEach(elem => _collection.push(elem));
                resolve();
            });

        });
    }
    // dbo.collection("customers").find({ }).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    static addCallDataInstance(callData) {
        _collection.push(callData);
    }

    static isEmpty() {
        return _collection.length === 0 ? true : false;
    }

    static getCollection() {
        return _collection;
    }
}


// async function findOneListingByName(client, nameOfListing) {
//     result = await client.db("sample_airbnb").collection("listingsAndReviews")
//         .findOne({ name: nameOfListing });

//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }
module.exports = CallDataCollection;
