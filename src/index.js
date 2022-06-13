import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./docs/swagger.json";

// Routes
import { orders, products, drivers, auth } from "./routes";

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

var options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  },
};

// TODO - UPDATE THIS TO USE CORS to only allow our frontend to access backend
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then((result) => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log("DATABASE CONNECTION ERROR:", err));

app.use(bodyParser.json());

// Logger
app.use(morgan("combined"));

// Routes

// Api documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
// Authentication Routes
app.use("/auth", auth);
// Products Routes
app.use("/products", products);
// Orders Routes
app.use("/orders", orders);
// Drivers Routes
app.use("/drivers", drivers);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
