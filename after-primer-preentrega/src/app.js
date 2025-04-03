import express from 'express';
import CartManager from './CartManager.js';

const app = express();
app.use(express.json());

const cartManager = new CartManager();

//endpoints

//-----------rutas /api/products---------------------
//Debe listar todos los productos.
app.get('/api/products', (req, res)=>{

});

//Debe traer solo el producto con el id proporcionado.
app.get('/api/products/:pid', (req, res)=>{

});

//Debe agregar un nuevo producto
app.post('/api/products', (req, res)=>{

});

//Debe actualizar un producto
app.put('/api/products/:pid', (req, res)=>{

});

//Debe eliminar el producto con el pid indicado
app.delete('/api/products/:pid', (req, res)=>{

});

//---------------rutas /api/carts------------------
//Debe crear un nuevo carrito vacio
app.post('/api/carts', async(req, res)=>{
  const carts = await cartManager.addCart();
  res.status(201).json({ carts, message: "Nuevo carrito creado" });
});

//Debe listar los productos que pertenecen al carrito 
app.get('/api/carts/:cid', async(req, res)=>{
  const cid = req.params.cid;
  const products = await cartManager.getProductsInCartById(cid);
  res.status(200).json({ products, message: "Lista de productos" });
});

//Debe agregar el producto al carrito indicado
app.post('/api/carts/:cid/product/:pid', async(req, res)=>{
  const cid = req.params.cid;
  const pid = parseInt(req.params.pid);
  const quantity = req.body.quantity;

  const carts = await cartManager.addProductInCart(cid, pid, quantity);
  res.status(200).json({ carts, message: "Nuevo producto añadido" });
});

app.listen(8080, ()=> {
  console.log('Servidor iniciado en el puerto 8080');
});