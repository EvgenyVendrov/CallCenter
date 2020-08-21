const path = require("path");
const Kafka = require("node-rdkafka");

const _brokerList = "kafka-27a358e6-evgenyv94-e1a1.aivencloud.com:17410";
const pathForAccessKey = path.join(__dirname, "service.key");
const pathForSSLCert = path.join(__dirname, "service.cert");
const pathForCA = path.join(__dirname, "ca.pem");
const _fastTopicName = "fast_dashboard";
// const _slowTopicName = "slow_ML";
// const topic = `${_userName}-fast_lane`;


let _consumer;

const connectToKafka = () => {


    const kafkaConf = {
        "metadata.broker.list": _brokerList,
        "group.id": "dashboard",
        "security.protocol": "ssl",
        "ssl.key.location": pathForAccessKey,
        "ssl.certificate.location": pathForSSLCert,
        "ssl.ca.location": pathForCA,
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
        _consumer.subscribe([_fastTopicName]);
        _consumer.consume();
        console.sysa("kafka is connected");
    });

    _consumer.on("offsetOutOfRange", (m) => {
        console.sysa("OFFSET ERROR");
    });
};

const getConsumerAPI = () => {
    if (_consumer) {
        return _consumer;
    }
    throw "consumer not connected yet!";
};

// const getUserName = () => {
//     return _userName;
// };


// exports.getUserName = getUserName;
exports.connectToKafka = connectToKafka;
exports.getConsumerAPI = getConsumerAPI;

