import express from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../../controllers/products";

let products = express.Router();

products.get("/", getProducts);
products.get("/:id", getProduct);
products.put("/:id", updateProduct);
products.post("/", createProduct);

export default products;
