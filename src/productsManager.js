class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        product.id = this.nextId++;
        this.products.push(product);
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id != id);
    }

    getProducts() {
        return this.products;
    }
}

module.exports = ProductManager;