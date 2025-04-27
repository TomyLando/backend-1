import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import { __dirname } from '../utils.js';
import path from 'path';

const router = Router();
const cartsFilePath = path.join(__dirname, 'data', 'carts.json');
const cartManager = new CartManager(cartsFilePath);

// CREATE CART
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// GET CART BY ID
router.get('/:cid', async (req, res) => {
  const id = req.params.cid;
  const cart = await cartManager.getCartById(id);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

// ADD PRODUCT TO CART
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.addProductToCart(cid, pid);
  res.json(result);
});

export default router;
