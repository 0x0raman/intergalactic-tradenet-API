const express = require('express');
const router = express.Router();
const logger = require('./utils/logger');

router.get('/inventory/:stationId', (req, res) => {
    const stationId = req.params.stationId;

    const inventoryData = {
        stationId: stationId,
        levels: {
            fuel: 100,
            oxygen: 200,
        }
    };

    logger.info(`Inventory levels retrieved for station ID: ${stationId}`);

    res.status(200).json(inventoryData);
});

module.exports = router;
