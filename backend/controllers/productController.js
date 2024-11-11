const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, type, price, stock } = req.body;
    const product = new Product({ user: req.user.id, name, type, price, stock });
    await product.save();
    res.status(201).json(product);
};

const getProducts = async (req, res) => {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, stock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, type, price, stock }, { new: true });
    res.json(product);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(204).send();
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
