const express = require("express");
const app = express();

const path = require("path");

const router = require("./routes/routes");

const controllers = require("./controllers/controllers.js");

const kafkaConnector = require("./utils/kafkaConnector.js");

const socketHandler = require("./utils/socketHandler.js");

const controllersInit = require("./controllers/controllers").init;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use("/", controllers.redirectNonExistingUrl);

console.sysa = (...val) => console.log("SYS_A:", Array.from(val).join(" "));

kafkaConnector.connectToKafka()
    .then(() => {
        controllersInit();
        console.sysa("connected to kafka");
        const server = app.listen(3000);
        console.sysa("connected to server");

        socketHandler.init(server);
        socketHandler.configureConnections();

    })
    .catch(err => { throw err; });

