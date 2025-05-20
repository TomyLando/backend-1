const express = require("express");
const router = express.Router();

const ProductManager = require("../productsManager");
const manager = new ProductManager();

router.get("/", (req, res) => {
    res.render("home", { products: manager.getProducts() });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

module.exports = router;