const express = require('express');
const bodyParser = require('body-parser');
const tradeService = require('./services/tradeService');
const cargoService = require('./services/cargoService');
const inventoryService = require('./services/inventoryService');
const updatesService = require('./services/updatesService');
const errorHandler = require('./services/utils/errorHandler');
const logger = require('./services/utils/logger');

const app = express();

app.use(bodyParser.json());

app.use('/api', tradeService);
app.use('/api', cargoService);
app.use('/api', inventoryService);
app.use('/api', updatesService);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info(`API Gateway listening on port ${PORT}`);
});

module.exports = server;
