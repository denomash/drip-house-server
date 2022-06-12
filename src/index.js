import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// Routes
import { orders, products, drivers, auth } from "./routes";

require('dotenv').config()

const PORT = process.env.PORT || 8080;

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
})
    .then((result) => console.log('DATABASE CONNECTED'))
    .catch((err) => console.log("DATABASE CONNECTION ERROR:", err));

app.use(bodyParser.json());

// TODO - UPDATE THIS TO USE CORS to only allow our frontend to access backend
app.use(cors());


// Logger
app.use(morgan('combined'))

// Authentication Routes
app.use('/auth', auth)
// Products Routes
app.use('/products', products)
// Orders Routes
app.use('/orders', orders)
// Drivers Routes
app.use('/drivers', drivers)

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));
