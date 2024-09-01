const WebSocket = require('ws');
const db = require('./utils/db');
const logger = require('./utils/logger');
const config = require('../config/config');

const wss = new WebSocket.Server({ port: config.websocket.port });

const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

wss.on('connection', (ws) => {
    logger.info('Client connected for real-time analytics');
    
    ws.on('message', (message) => {
        logger.info('Received:', message);
    });

    ws.on('close', () => {
        logger.info('Client disconnected');
    });
});

const pushRealTimeUpdates = async () => {
    try {
        const tradeVolume = await db.query('SELECT COUNT(*) FROM trades WHERE status = $1', ['initiated']);
        const activeCargo = await db.query('SELECT COUNT(*) FROM cargo WHERE status = $1', ['enroute']);
        const inventoryLevels = await db.query('SELECT station_id, goods, quantity FROM inventory');

        const metrics = {
            tradeVolume: tradeVolume.rows[0].count,
            activeCargo: activeCargo.rows[0].count,
            inventoryLevels: inventoryLevels.rows
        };

        broadcast(metrics);
    } catch (error) {
        logger.error('Error pushing real-time updates:', error);
    }
};

setInterval(pushRealTimeUpdates, 5000);
