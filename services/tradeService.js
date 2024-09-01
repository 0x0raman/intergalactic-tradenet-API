const express = require('express');
const db = require('./utils/db');
const emitEvent = require('./utils/eventEmitter');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const config = require('../config/config');

const router = express.Router();

router.post('/trades', async (req, res, next) => {
    const { stationId, planetId, goods, quantity } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO trades (station_id, planet_id, goods, quantity, status, timestamp) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
            [stationId, planetId, goods, quantity, 'initiated']
        );
        const trade = result.rows[0];
        emitEvent(config.kafka.topics.tradeInitiated, trade);
        res.status(201).json(trade);
    } catch (error) {
        next(error);
    }
});

router.get('/trades/:transactionId', async (req, res, next) => {
    const { transactionId } = req.params;
    try {
        const result = await db.query('SELECT * FROM trades WHERE trade_id = $1', [transactionId]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Trade not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
