const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/routes");
const controllers = require("./controllers/controllers");
const kafkaConnector = require("./utils/kafkaConnector");
const mongodb = require("./utils/mongodb");
const setListenersOnKafka = require("./models/kafkaHandler");
const CallDataCollection = require("./models/CallDataCollection");
const runBigML = require("./utils/bigMLHandler");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use("/", controllers.redirectNonExistingUrl);

console.sysc = (...val) => console.log("SYS_C:", Array.from(val).join(" "));

kafkaConnector.connectToKafka()
    .then(() => {
        mongodb.connectToMongo(() => {
            setListenersOnKafka();
            CallDataCollection.init();
            const server = app.listen(5000);
            console.sysc("connected to server");
            runBigML();
        });
    })
    .catch(err => { throw err; });

