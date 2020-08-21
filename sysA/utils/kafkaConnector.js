const Kafka = require("node-rdkafka");
const path = require("path");

// const _userName = "2yjknas1";
// const _password = "E3y_RbJJE1CW6VscK25r-ql94b0KHOQr";
const _brokerList = "kafka-27a358e6-evgenyv94-e1a1.aivencloud.com:17410";
const pathForAccessKey = path.join(__dirname, "service.key");
const pathForSSLCert = path.join(__dirname, "service.cert");
const pathForCA = path.join(__dirname, "ca.pem");
const _fastTopicName = "fast_dashboard";
const _slowTopicName = "slow_ML";



let _producer;

module.exports = {

    connectToKafka: () => {
        const kafkaConf = {
            "metadata.broker.list": _brokerList,
            "security.protocol": "ssl",
            "ssl.key.location": pathForAccessKey,
            "ssl.certificate.location": pathForSSLCert,
            "ssl.ca.location": pathForCA,
            "dr_cb": true,
            "debug": "generic,broker,security"
        };

        _producer = new Kafka.Producer(kafkaConf);

        return new Promise((result, reject) => {
            _producer.connect({}, (err => {
                if (err) { reject(err); }
                else {
                    result();
                }
            }));
        });
    },

    getProducerAPI: () => {
        if (_producer) {
            return _producer;
        }
        throw "producer not connected yet!";
    },

    getFastTopicName: () => {
        return _fastTopicName;
    },

    getSlowTopicName: () => {
        return _slowTopicName;
    }
};




