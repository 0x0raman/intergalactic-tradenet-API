const express = require('express');
const db = require('./utils/db');
const emitEvent = require('./utils/eventEmitter');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const config = require('../config/config');

const router = express.Router();

router.post('/cargo', async (req, res, next) => {
    const { tradeId, cargoDetails, currentLocation } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO cargo (trade_id, cargo_details, current_location, status, estimated_delivery) VALUES ($1, $2, $3, $4, NOW() + INTERVAL \'2 days\') RETURNING *',
            [tradeId, cargoDetails, currentLocation, 'enroute']
        );
        const cargo = result.rows[0];
        emitEvent(config.kafka.topics.cargoCreated, cargo);
        res.status(201).json(cargo);
    } catch (error) {
        next(error);
    }
});

router.get('/cargo/:shipmentId', async (req, res, next) => {
    const { shipmentId } = req.params;
    try {
        const result = await db.query('SELECT * FROM cargo WHERE shipment_id = $1', [shipmentId]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Cargo not found' });
        }
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;
