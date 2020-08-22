const path = require("path");
const Kafka = require("node-rdkafka");

const _brokerList = "kafka-27a358e6-evgenyv94-e1a1.aivencloud.com:17410";
const pathForAccessKey = path.join(__dirname, "kafka-SSL-files", "service.key");
const pathForSSLCert = path.join(__dirname, "kafka-SSL-files", "service.cert");
const pathForCA = path.join(__dirname, "kafka-SSL-files", "ca.pem");
const _fastTopicName = "slow_ML";


let _consumer;
module.exports = {
    connectToKafka: () => {


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

        _setConsumeCallBacks();

        return new Promise((result, reject) => {
            _consumer.connect({}, (err => {
                if (err) { reject(err); }
                else {
                    result();
                }
            }));
        });
    },

    getConsumerAPI: () => {
        if (_consumer) {
            return _consumer;
        }
        throw "consumer not connected yet!";
    }
};

const _setConsumeCallBacks = () => {

    _consumer.on("error", function (err) {
        throw new error(err);
    });

    _consumer.on("ready", () => {
        _consumer.subscribe([_fastTopicName]);
        _consumer.consume();
        console.sysc("kafka is connected");
    });

    _consumer.on("offsetOutOfRange", (m) => {
        console.sysc("OFFSET ERROR");
    });
};





