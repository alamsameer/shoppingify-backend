Absolutely, I'll help you craft a comprehensive README for your backend API using the provided information. Please note that you should expand on each section to provide more detailed information as needed.

---

# Shoppingify Backend API Documentation

Welcome to the Shoppingify Backend API documentation. This API provides various endpoints for managing shopping lists, items, categories, and statistics. It is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Controllers](#controllers)
- [Models](#models)
- [Services](#services)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Shoppingify Backend API serves as the foundation for the Shoppingify application, offering endpoints to manage shopping lists, items, categories, and statistics.

## Features

- Fetch all items and items by category
- Get individual item details
- Create, update, and delete items
- Add categories and fetch all categories
- Create, update, and delete shopping lists
- Add items to shopping lists and update their status
- Get top items and top categories
- Get monthly status statistics


## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running instance)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/shoppingify-backend.git
   ```

2. Navigate to the project directory:

   ```sh
   cd shoppingify-backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   PORT=<server-port>
   ```

   Replace `<your-mongodb-uri>` with your MongoDB connection URI and `<server-port>` with the desired port for the server.

2. Start the server:

   ```sh
   npm start
   ```

   The server will run on the port specified in the `.env` file.

## API Endpoints

- `GET /api/items`: Fetch all items
- `GET /api/items/:categoryId`: Get items by category
- `GET /api/item/:itemId`: Get individual item details
- `GET /api/items?page=:pageNumber&perPage=:itemsPerPage`: Fetch items by page
- `POST /api/add-item`: Add item to the database
- `POST /api/add-category`: Add category to the database
- `GET /api/category`: Fetch all categories
- `GET /api/shopping-list/active`: Get active shopping list
- `GET /api/shopping-lists`: Get all shopping lists
- `POST /api/shopping-list/create`: Create a shopping list
- `POST /api/shopping-list/add-item`: Add item to shopping list
- `DELETE /api/shopping-list/delete-item`: Delete item from shopping list
- `PUT /api/shopping-list/status`: Update shopping list status (cancel/complete)
- `PUT /api/shopping-list/item-status`: Update item status to done (true/false)
- `PUT /api/shopping-list/update-name`: Update the name of the shopping list
- `GET /api/statistics/top-items`: Get top items
- `GET /api/statistics/top-categories`: Get top categories
- `GET /api/statistics/monthly-status`: Get monthly status statistics
- ...


## Contributing

Contributions are welcome! Feel free to open issues and pull requests to suggest enhancements or report bugs.

