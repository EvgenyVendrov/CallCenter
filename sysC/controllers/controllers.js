const CallDataCollection = require("../models/CallDataCollection");

const getAllData = async (req, res, next) => {
    await CallDataCollection.getCallsFromMongo();
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