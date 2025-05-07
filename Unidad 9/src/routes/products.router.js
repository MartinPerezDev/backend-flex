import express from "express";
import ProductManager from "../ProductManager.js";
import Product from "../models/product.model.js";

//instanciamos el router de express para manejar las rutas
const productsRouter = express.Router();
//instanciamos el manejador de nuestro archivo de productos
const productManager = new ProductManager("./src/data/products.json");

productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const products = await Product.paginate({}, { limit, page});
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

productsRouter.get("/:pid", async (req, res) => {
  try {
    const products = await productManager.getProductById(req.params.pid);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = req.body;
    const products = await productManager.setProductById(req.params.pid, updatedProduct);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.pid);
    res.status(200).json({ message: `Producto con id: ${req.params.pid} eliminado` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//endpoint para practicar aggregations
productsRouter.get("/aggregations/example", async(req, res)=> {
  try {
    const response = await Product.aggregate([
      //1 - traemos los productos que dentro del campo "description" contenga la palabra "moderno"
      { $match: { $text: { $search: "moderno" } } },
      //2 - traemos los productos que cuesten mas de 60 mil
      { $match: { price: { $gt: 60000 } } },
      //3 - realizamos una proyeccion para traer solo los datos que nos interesan
      { 
        $project: {
          title: 1,
          description: 1,
          category: 1,
          price: 1
        } 
      }
    ]);

    res.status(200).json({ status: "succes", payload: response });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default productsRouter;