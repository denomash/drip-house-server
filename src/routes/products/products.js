import express from "express";

// Controllers
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/products";

// Middlewares
import auth from "../../middlewares/auth";

let products = express.Router();

products.get("/", auth, getProducts);
products.get("/:id", auth, getProduct);
products.put("/:id", auth, updateProduct);
products.post("/", auth, createProduct);

export default products;
