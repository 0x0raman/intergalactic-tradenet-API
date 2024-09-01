module.exports = {
    db: {
        user: 'postgres',
        host: 'localhost',
        database: 'intergalactic_trade',
        password: '12345',
        port: 5432,
    },
    kafka: {
        host: 'localhost:9092',
        topics: {
            tradeInitiated: 'trade-initiated',
            cargoCreated: 'cargo-created',
        }
    },
    websocket: {
        port: 8080
    }
};
