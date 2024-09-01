const request = require('supertest');
const chai = require('chai');
const should = chai.should();
const server = require('../index'); // Import the HTTP server

describe('API Endpoints', () => {

    describe('POST /api/trades', () => {
        it('should create a new trade', (done) => {
            const trade = {
                stationId: 1,
                planetId: 2,
                goods: 'food',
                quantity: 100
            };

            request(server)
                .post('/api/trades')
                .send(trade)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('trade_id');
                    done();
                });
        });
    });

    describe('GET /api/trades/:transactionId', () => {
        it('should retrieve details of a trade transaction', (done) => {
            const transactionId = 1; // Use an appropriate ID for testing

            request(server)
                .get(`/api/trades/${transactionId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('trade_id');
                    done();
                });
        });
    });

    describe('POST /api/cargo', () => {
        it('should create a new cargo shipment', (done) => {
            const cargo = {
                shipmentId: 1,
                content: 'supplies',
                destination: 'station_5',
                status: 'in transit'
            };

            request(server)
                .post('/api/cargo')
                .send(cargo)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('shipment_id');
                    done();
                });
        });
    });

    describe('GET /api/cargo/:shipmentId', () => {
        it('should retrieve cargo shipment details', (done) => {
            const shipmentId = 1; // Use an appropriate ID for testing

            request(server)
                .get(`/api/cargo/${shipmentId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('shipment_id');
                    done();
                });
        });
    });

    describe('GET /api/inventory/:stationId', () => {
        it('should retrieve inventory levels for a space station', (done) => {
            const stationId = 1; // Use an appropriate ID for testing

            request(server)
                .get(`/api/inventory/${stationId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('stationId');  // Updated property to match expected response
                    res.body.should.have.property('levels');  // Updated property to match expected response
                    done();
                });
        });
    });

    describe('GET /api/updates/real-time', () => {
        it('should retrieve real-time updates on trade and cargo status', (done) => {
            request(server)
                .get('/api/updates/real-time')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.be.a('object');
                    res.body.should.have.property('tradeVolume');  // Updated property to match expected response
                    res.body.should.have.property('activeShipments');  // Updated property to match expected response
                    res.body.should.have.property('recentActivity');  // Updated property to match expected response
                    done();
                });
        });
    });

});

