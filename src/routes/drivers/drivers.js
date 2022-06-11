import express from "express";
import { getDrivers } from "../../controllers/drivers";

let orders = express.Router()

orders.get('/', getDrivers);


export default orders;