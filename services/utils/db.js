const { Pool } = require('pg');
const config = require('../../config/config');
const logger = require('./logger');

const pool = new Pool(config.db);

pool.on('connect', () => {
    logger.info('Connected to the database');
});

pool.on('error', (err) => {
    logger.error('Database connection error:', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
