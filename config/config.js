module.exports = {
    db: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'intergalactic_trade',
        password: process.env.DB_PASSWORD || '12345',
        port: process.env.DB_PORT || 5432,
    },
    kafka: {
        host: process.env.KAFKA_HOST || 'localhost:9092',
        topics: {
            tradeInitiated: process.env.KAFKA_TOPIC_TRADE_INITIATED || 'trade-initiated',
            cargoCreated: process.env.KAFKA_TOPIC_CARGO_CREATED || 'cargo-created',
        }
    },
    websocket: {
        port: process.env.WEBSOCKET_PORT || 8080
    }
};