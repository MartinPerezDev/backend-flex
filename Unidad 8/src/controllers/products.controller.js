import Product from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" });
  }
}

const createProduct = async (req, res) => {
  try {
    const { title, price, stock } = req.body;

    const product = new Product({ title, price, stock });
    await product.save();

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear un nuevo producto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al editar el producto" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar el producto" });
  }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct };