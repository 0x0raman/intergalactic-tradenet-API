# Intergalactic Trade Network API

### HOSTED SITE: https://intergalactic-tradenet-circlepe-api.onrender.com/
This is a free instance that will spin down with inactivity, which can delay requests by 50 seconds or more.

### NOTE: The main branch is for local deployment, change branch to aws_host which was configured for using AWS RDS PostgreSQL DB and their after deployed the branch on render.

This project is an API for managing an intergalactic trade network. It handles trade transactions, cargo shipments, inventory levels at space stations, and provides real-time updates on trade and cargo status. The project uses Node.js, Express, Kafka, and PostgreSQL as its primary technologies.

## Features

- **Trade Management**: Create and retrieve trade transactions.
- **Cargo Management**: Create and retrieve cargo shipments.
- **Inventory Management**: Retrieve inventory levels for space stations.
- **Real-time Updates**: Get real-time updates on trade volumes and cargo status.

## Requirements

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **PostgreSQL**: The API uses PostgreSQL for database management.
- **Kafka**: Kafka is used for message brokering between services.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    https://github.com/0x0raman/intergalactic-tradenet-circlepe-API.git
    cd intergalactic-tradenet-circlepe
    ```

2. **Install Node.js dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**: Create a `.env` file in the root directory of the project. Configure it with the following variables:
    ```plaintext
    DB_USER=your_postgres_user
    DB_HOST=your_rds_endpoint
    DB_NAME=your_database_name
    DB_PASSWORD=your_database_password
    DB_PORT=5432
    ```

4. **Run PostgreSQL**: If not using Docker, make sure PostgreSQL is running, and the database is created with the appropriate schema.

5. **Run Kafka & Zookeeper**: configure the properties of both and run via the following command
    ```bash
    .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
    .\bin\windows\kafka-server-start.bat .\config\server.properties
    ```

6. **Start the API**:
    ```bash
    npm start
    ```

7. **Run Tests**: configured the api.test.js to run tests on all api endpoints their by validating the endpoints
    ```bash
    npm test
    ```

## Endpoints

### Trade Endpoints

- **POST /api/trades**
    - Create a new trade.
    - **Body Parameters**: 
        - `stationId`: ID of the space station.
        - `planetId`: ID of the planet involved in the trade.
        - `goods`: The goods being traded.
        - `quantity`: Quantity of the goods.

- **GET /api/trades/:transactionId**
    - Retrieve details of a specific trade transaction.
    - **URL Parameters**:
        - `transactionId`: ID of the trade transaction.

### Cargo Endpoints

- **POST /api/cargo**
    - Create a new cargo shipment.
    - **Body Parameters**: 
        - `shipmentId`: ID of the shipment.
        - `content`: Contents of the cargo.
        - `destination`: Destination of the cargo.
        - `status`: Status of the shipment.

- **GET /api/cargo/:shipmentId**
    - Retrieve details of a specific cargo shipment.
    - **URL Parameters**:
        - `shipmentId`: ID of the cargo shipment.

### Inventory Endpoints

- **GET /api/inventory/:stationId**
    - Retrieve inventory levels for a space station.
    - **URL Parameters**:
        - `stationId`: ID of the space station.

### Updates Endpoints

- **GET /api/updates/real-time**
    - Retrieve real-time updates on trade and cargo status.

## Deployment
- **AWS RDS**: Create and deploy PostgreSQL using AWS RDS.
- **Render**: Use Render to host and deploy with kafka running locally
