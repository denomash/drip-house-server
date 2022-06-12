import express from "express";

// Controllers
import { login } from "../../controllers/auth/login";
import { signup } from "../../controllers/auth/signup";

let orders = express.Router();

orders.post("/login", login);
orders.post("/signup", signup);

export default orders;
