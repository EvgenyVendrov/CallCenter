const _kafkaConnector = require("../utils/kafkaConnector");
const _uuid = require("uuid");

const _genMessage = m => new Buffer.alloc(m.length, m);

const _sendDataToKafka = (data, partition, lane) => {
    const kafkaProducerAPI = _kafkaConnector.getProducerAPI();
    const stringCallData = JSON.stringify(data);
    kafkaProducerAPI.produce(lane, partition, _genMessage(stringCallData), _uuid.v4());
};

module.exports = {

    sendDataFastLane: (data, partition) => {

        _sendDataToKafka(data, partition, _kafkaConnector.getFastTopicName());
    },

    sendDataSlowLane: (data, partition) => {

        _sendDataToKafka(data, partition, _kafkaConnector.getSlowTopicName());
    }


};


// sendDataToKafka = (data, partition, lane) => {
//     const kafkaProducerAPI = _kafkaConnector.getProducerAPI();
//     const stringCallData = JSON.stringify(data);
//     kafkaProducerAPI.produce(_kafkaConnector.getUserName() + lane, partition, _genMessage(stringCallData), _uuid.v4());
// };

// sendDataFastLane = (data, partition) => {

//     sendDataToKafka(data, partition, "-fast_lane");
// };

// sendDataSlowLane = (data, partition) => {

//     sendDataToKafka(data, partition, "-slow_lane");
// };

// module.exports = { sendDataFastLane, sendDataSlowLane };

