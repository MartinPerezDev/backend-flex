import express from "express";
import ProductManager from "../ProductManager.js";

const viewsRouter = express.Router();

const productManager = new ProductManager();
const user = { username: "LucasDev01", isAdmin: true };

const middlewareIsAdmin = (req, res, next) => {
  if(user.isAdmin){
    next();
  }else{
    res.redirect('/error');
  }
}

viewsRouter.get('/', middlewareIsAdmin, (req, res)=> {
  res.render('home');
});

viewsRouter.get('/dashboard', async(req, res)=> {

  const products = await productManager.getProducts();

  res.render('dashboard', { products, user } );
});

export default viewsRouter;