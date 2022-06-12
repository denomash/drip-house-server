import express from "express";

// Controllers
import { getDrivers } from "../../controllers/drivers";

// Middlewares
import auth from "../../middlewares/auth";

let orders = express.Router()

orders.get('/', auth, getDrivers);


export default orders;