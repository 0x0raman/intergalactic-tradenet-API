const kafka = require('kafka-node');
const config = require('../../config/config');
const logger = require('./logger');

const client = new kafka.KafkaClient({ kafkaHost: config.kafka.host });
const producer = new kafka.Producer(client);

producer.on('ready', () => logger.info('Kafka Producer is connected and ready.'));
producer.on('error', (err) => logger.error('Kafka Producer Error:', err));

const emitEvent = (topic, message) => {
    const payloads = [{ topic, messages: JSON.stringify(message) }];
    producer.send(payloads, (err, data) => {
        if (err) logger.error('Kafka Send Error:', err);
        else logger.info('Event sent to Kafka:', data);
    });
};

module.exports = emitEvent;