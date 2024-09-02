# Intergalactic Trade Network API

### Hosted Sites

- **Render**: [Intergalactic Trade Network API](https://intergalactic-tradenet-circlepe-api.onrender.com/)
  - Note: This is a free instance that may experience delays of up to 50 seconds due to inactivity.
- **AWS EC2**: [Intergalactic Trade Network API](http://13.234.116.91:3000/)

### Branch Information

- **Main Branch**: For local deployment.
- **aws_host Branch**: Configured for deployment using AWS RDS PostgreSQL DB, hosted on Render.
- **ec2 Branch**: Configured for deployment on an AWS EC2 Linux instance.

> **Important**: The `POSTMAN.pdf` file in the `Document` folder contains sensitive information. It is password-protected. Use the company's name in lowercase to unlock.

## Project Overview

This API is designed to manage an intergalactic trade network, facilitating trade transactions, cargo shipments, and inventory management across space stations. The system also provides real-time updates on trade and cargo status.

### Key Features

- **Trade Management**: Create and retrieve trade transactions.
- **Cargo Management**: Manage cargo shipments with the ability to create and retrieve shipment details.
- **Inventory Management**: Retrieve inventory levels at various space stations.
- **Real-Time Updates**: Get live updates on trade volumes and cargo statuses.

## Prerequisites

- **Node.js**: Download and install from [here](https://nodejs.org/).
- **PostgreSQL**: Required for database management.
- **Kafka**: Used for message brokering between services.

## Setup and Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/0x0raman/intergalactic-tradenet-circlepe-API.git
    cd intergalactic-tradenet-circlepe
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**: Create a `.env` file in the root directory with the following configuration:
    ```plaintext
    DB_USER=your_postgres_user
    DB_HOST=your_rds_endpoint
    DB_NAME=intergalactic_trade
    DB_PASSWORD=your_database_password
    DB_PORT=5432
    ```

4. **Database Setup**: Set up the PostgreSQL database using the following SQL commands:
    ```sql
    CREATE DATABASE intergalactic_trade;

    \c intergalactic_trade

    CREATE TABLE trades (
        trade_id SERIAL PRIMARY KEY,
        station_id INT,
        planet_id INT,
        goods VARCHAR(255),
        quantity INT,
        status VARCHAR(50),
        timestamp TIMESTAMP
    );

    CREATE TABLE cargo (
        shipment_id SERIAL PRIMARY KEY,
        trade_id INT REFERENCES trades(trade_id),
        cargo_details TEXT,
        current_location VARCHAR(255),
        status VARCHAR(50),
        estimated_delivery TIMESTAMP
    );

    CREATE TABLE inventory (
        inventory_id SERIAL PRIMARY KEY,
        station_id INT,
        goods VARCHAR(255),
        quantity INT
    );
    ```

5. **Run Kafka & Zookeeper**: Ensure Kafka and Zookeeper are configured properly, then start them:
    ```bash
    ./bin/windows/zookeeper-server-start.bat ./config/zookeeper.properties
    ./bin/windows/kafka-server-start.bat ./config/server.properties
    ```

6. **Start the API**:
    ```bash
    npm start
    ```

7. **Run Tests**: Validate the API endpoints using the provided test script:
    ```bash
    npm test
    ```

## API Endpoints

### Trade Endpoints

- **POST /api/trades**
    - Create a new trade.
    - **Body Parameters**:
        - `stationId`: ID of the space station.
        - `planetId`: ID of the planet involved in the trade.
        - `goods`: Goods being traded.
        - `quantity`: Quantity of goods.

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
        - `status`: Shipment status.

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

- **AWS RDS**: Use AWS RDS to create and manage the PostgreSQL database.
- **Render**: Host the API and Kafka services on Render.
- **AWS EC2**: Deploy the API and Kafka on an AWS EC2 instance.