# Intergalactic Trade Network API

### Hosted Sites

- **Render**: [Intergalactic Trade Network API](https://intergalactic-tradenet-circlepe-api.onrender.com/)
  - Note: This is a free instance that may experience delays of up to 50 seconds due to inactivity.
- **AWS EC2**: [Intergalactic Trade Network API](http://13.234.116.91:3000/)
  - Note: The EC2 instance stopped on 04-Sept-24 due to charge overhead for public IPv4 address and MSK Service for kafka.

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
    git clone https://github.com/0x0raman/intergalactic-tradenet-API.git
    cd intergalactic-tradenet-API
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

## Known Limitations and Potential Improvements

- **Scaling**: The current implementation may require optimizations to handle extreme load efficiently.
- **Security**: There is a need to enhance security by implementing robust authentication and authorization mechanisms.
- **UI Integration**: Extending the project with a frontend dashboard would provide better user interaction and improve usability.

## Why PostgreSQL and Kafka?

### PostgreSQL
- **Reliability**: PostgreSQL is known for its robustness, reliability, and ACID compliance, which are crucial for maintaining data integrity in an intergalactic trade network where transactions must be consistent and accurate.
- **Advanced Features**: PostgreSQL offers advanced features like complex queries, full-text search, and support for JSON data types, making it versatile for handling diverse data structures within the application.
- **Scalability**: With support for large datasets and a wide variety of indexing techniques, PostgreSQL can scale efficiently to meet the growing needs of the project.
- **Open Source**: As an open-source database, PostgreSQL provides flexibility without the licensing costs associated with other enterprise-grade databases like Oracle.

### Kafka
- **Real-time Data Streaming**: Kafka excels at handling high-throughput, real-time data streams, making it ideal for managing the flow of trade and cargo data across the network.
- **Decoupled Architecture**: By using Kafka, the system can achieve a loosely coupled architecture where producers (data generators) and consumers (data processors) are independent, allowing for better scalability and fault tolerance.
- **Durability and Fault Tolerance**: Kafka ensures data durability and fault tolerance through replication, which is essential in a distributed system like the intergalactic trade network where data loss is not acceptable.
- **Scalability**: Kafka is designed to handle large volumes of data and scale out horizontally, making it suitable for the growing needs of the project as the network expands.

## Scalability and Performance

### Scaling Strategies

- **Handling a Large Number of Concurrent Trade Transactions and Cargo Updates**:
  - **Horizontal Scaling**: Deploy multiple instances of the API on a load-balanced infrastructure to distribute the workload across servers. This helps manage a high number of concurrent requests efficiently.
  - **Database Sharding**: Implement sharding to distribute database transactions across multiple PostgreSQL instances, reducing the load on a single database and improving performance for concurrent transactions.
  - **Kafka Partitioning**: Use Kafka's partitioning feature to scale the handling of trade and cargo updates. Each partition can be processed independently, allowing the system to handle more transactions simultaneously.

- **Managing High Data Volume and Complex Queries**:
  - **Read Replicas**: Set up read replicas of the PostgreSQL database to offload read operations from the primary database. This helps in handling complex queries without affecting the performance of write operations.
  - **Asynchronous Processing**: Use Kafka to decouple real-time data processing tasks. This allows the system to handle large volumes of data asynchronously, without overwhelming the API with synchronous requests.
  - **Batch Processing**: Implement batch processing for non-urgent tasks like generating reports or aggregating data, which can be processed during off-peak hours to reduce the load on the system during high-traffic periods.

### Optimization

- **Caching**:
  - **In-Memory Caching**: Use an in-memory cache like Redis to store frequently accessed data such as trade and cargo records. This reduces the need for repeated database queries and speeds up response times.
  - **Content Delivery Network (CDN)**: For static assets or frequently accessed API responses, use a CDN to cache content closer to the user, reducing latency and load on the servers.

- **Data Partitioning**:
  - **Range Partitioning**: Implement range partitioning in PostgreSQL, where large tables are divided into smaller, more manageable partitions based on trade ID or timestamp. This allows the database to efficiently query and manage large datasets.
  - **Kafka Topic Partitioning**: Partition Kafka topics to enable parallel processing of messages, improving the throughput and scalability of the messaging system.

- **Indexing**:
  - **Database Indexing**: Use indexing on frequently queried columns such as `station_id`, `planet_id`, and `timestamp` in the PostgreSQL database to speed up query performance and reduce the time taken to retrieve data.
  - **Full-Text Search Indexing**: For complex queries involving textual data, implement full-text search indexing to allow faster and more efficient search capabilities within the database.
