const express = require("express");
const app = express();

const path = require("path");

const router = require("./routes/routes");

const controllers = require("./controllers/controllers.js");

const kafkaHandler = require("./utils/kafkaConnector.js");

const redisConnector = require("./utils/redisConnector.js");

const setFlushingOnRedis = require("./utils/redisRester.js");

const kafkaListenersSetter = require("./models/kafkaHandler");

const socketHandler = require("./utils/socketHandler");


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use("/", controllers.redirect);

console.sysb = (...val) => console.log("SYS_B:", Array.from(val).join(" "));

kafkaHandler.connectToKafka()
    .then(() => {
        redisConnector.connectRedis(() => {
            setFlushingOnRedis("0 0 * * *");
            controllers.init();
            kafkaListenersSetter();
            const server = app.listen(4000);
            console.sysb("connected to server");
            socketHandler.init(server);
            socketHandler.configureConnections();
        });
    })
    .catch(err => { throw err; });
