const fs = require("fs");
const path = require("path");
const CallDataCollection = require("../models/CallDataCollection");


const getAllData = async (req, res, next) => {
    console.log("GOT INTO FUNCK");
    await CallDataCollection.getCallsFromMongo();
    const jsonToWrite = JSON.stringify(CallDataCollection.getCollection());
    // console.log(jsonToWrite);
    fs.writeFile(path.join(__dirname, "..", "dataset", "dataset.json"), jsonToWrite, function (err) {
        if (err) {
            return console.log(err);
        }
        console.sysc("The file was saved!");
    });
    // console.log("ZORGA=>", CallDataCollection.getCollection());
    res.render("test", {
        dataCollection: CallDataCollection.getCollection()
    });
};

const redirectNonExistingUrl = (req, res, next) => {
    res.redirect("/allData");
};

const newCallEnded = () => {

    // console.log("whole data = >", CallDataCollection.getCollection());
};

module.exports = { getAllData, redirectNonExistingUrl, newCallEnded };