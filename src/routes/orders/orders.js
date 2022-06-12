import express from "express";

// Controllers
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../../controllers/orders";

// Middlewares
import auth from "../../middlewares/auth";

let orders = express.Router();

orders.get("/", auth, getOrders);
orders.get("/status/:status", auth, getOrders);
orders.get("/:id", auth, getOrder);
orders.post("/", auth, createOrder);
orders.put("/:id", auth, updateOrder);

export default orders;
