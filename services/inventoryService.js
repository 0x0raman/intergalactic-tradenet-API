const express = require('express');
const router = express.Router();
const logger = require('./utils/logger');

// Example route: GET /api/inventory/:stationId
router.get('/inventory/:stationId', (req, res) => {
    const stationId = req.params.stationId;

    // Sample inventory data, replace with actual DB calls or logic
    const inventoryData = {
        stationId: stationId,
        levels: {
            fuel: 100,
            oxygen: 200,
        }
    };

    // Log the request for debugging
    logger.info(`Inventory levels retrieved for station ID: ${stationId}`);

    res.status(200).json(inventoryData);
});

module.exports = router;
