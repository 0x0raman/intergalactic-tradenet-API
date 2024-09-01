const kafka = require('kafka-node');
const db = require('./utils/db');
const logger = require('./utils/logger');
const config = require('../config/config');

const client = new kafka.KafkaClient({ kafkaHost: config.kafka.host });
const consumer = new kafka.Consumer(
    client,
    [
        { topic: config.kafka.topics.tradeInitiated, partition: 0 },
        { topic: config.kafka.topics.cargoCreated, partition: 0 }
    ],
    { autoCommit: true }
);

consumer.on('message', async (message) => {
    const event = JSON.parse(message.value);

    try {
        switch (message.topic) {
            case config.kafka.topics.tradeInitiated:
                await db.query('UPDATE inventory SET quantity = quantity - $1 WHERE station_id = $2 AND goods = $3',
                    [event.quantity, event.station_id, event.goods]);
                logger.info('Inventory updated for trade:', event);
                break;

            case config.kafka.topics.cargoCreated:
                logger.info('Cargo created event processed:', event);
                break;

            default:
                logger.warn('Unknown event received:', event);
        }
    } catch (err) {
        logger.error('Error processing event:', err);
    }
});

consumer.on('error', (err) => logger.error('Kafka Consumer Error:', err));
