import express from "express";
import { createOrder, getOrder, getOrders, updateOrder } from "../../controllers/orders";

let orders = express.Router()

orders.get('/', getOrders);
orders.get('/:id', getOrder);
orders.post('/', createOrder);
orders.put('/:id', updateOrder);


export default orders;