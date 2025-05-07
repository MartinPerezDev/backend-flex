import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js"

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", createProduct);

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;