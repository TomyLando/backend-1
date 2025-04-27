import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import { __dirname } from '../utils.js';
import path from 'path';

const router = Router();
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const productManager = new ProductManager(productsFilePath);

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET PRODUCT BY ID
router.get('/:pid', async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// CREATE PRODUCT
router.post('/', async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.status(201).json(newProduct);
});

// UPDATE PRODUCT
router.put('/:pid', async (req, res) => {
  const id = req.params.pid;
  const updatedFields = req.body;
  const result = await productManager.updateProduct(id, updatedFields);
  res.json(result);
});

// DELETE PRODUCT
router.delete('/:pid', async (req, res) => {
  const id = req.params.pid;
  const result = await productManager.deleteProduct(id);
  res.json(result);
});

export default router;
