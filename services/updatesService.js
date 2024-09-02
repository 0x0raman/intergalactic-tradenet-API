const express = require('express');
const router = express.Router();

router.get('/updates/real-time', (req, res) => {
    const realTimeUpdates = {
        tradeVolume: 500,
        activeShipments: 15,
        recentActivity: ["Shipment A dispatched", "Trade B completed"]
    };
    res.status(200).json(realTimeUpdates);
});

module.exports = router;