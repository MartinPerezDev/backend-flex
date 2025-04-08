import express from 'express';
import ProductManager from '../ProductManager.js';
import uploader from '../utils/uploader.js';

const productManager = new ProductManager();

const productsRouter = express.Router();

productsRouter.post('/', uploader.single("file"),  async(req, res)=> {
  if(!req.file) return res.status(401).json({ message: "Falta adjuntar la imagen" });

  const title = req.body.title;
  const price = parseInt(req.body.price);
  const thumbnail = "/img/"+req.file.filename;

  await productManager.addProduct({ title, price, thumbnail });
  //redireccionamos al usuario a la ruta de /dashboard
  res.redirect('/dashboard');
});

export default productsRouter;