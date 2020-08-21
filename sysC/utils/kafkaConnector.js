const Kafka = require("node-rdkafka");

const _userName = "0vykth32";
const topic = `${_userName}-slow_lane`;


let _consumer;

const connectToKafka = () => {


    const kafkaConf = {
        "group.id": "cloudkarafka-example",
        "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094".split(","),
        "socket.keepalive.enable": true,
        "security.protocol": "SASL_SSL",
        "sasl.mechanisms": "SCRAM-SHA-256",
        "sasl.username": _userName,
        "sasl.password": "7QDdk9nRFBSgdkl2zKxlPKycOn9UiZdK",
        "debug": "generic,broker,security"
    };

    _consumer = new Kafka.KafkaConsumer(kafkaConf);

    setConsumeCallBacks();

    return new Promise((result, reject) => {
        _consumer.connect({}, (err => {
            if (err) { reject(err); }
            else {
                result();
            }
        }));
    });


};

const setConsumeCallBacks = () => {

    _consumer.on("error", function (err) {
        throw new error(err);
    });

    _consumer.on("ready", () => {
        _consumer.subscribe([topic]);
        _consumer.consume();
        console.sysc("kafka is connected");
    });

    _consumer.on("offsetOutOfRange", (m) => {
        console.sysc("OFFSET ERROR");
    });
};

const getConsumerAPI = () => {
    if (_consumer) {
        return _consumer;
    }
    throw "consumer not connected yet!";
};

const getUserName = () => {
    return _userName;
};


// exports.getUserName = getUserName;
exports.connectToKafka = connectToKafka;
exports.getConsumerAPI = getConsumerAPI;

