// product.model.js传过来的
// 这里传过来的model，一般都大写命名，来区分
const Product = require('../models/product.model')

const getProducts = async (req, res) => {
    const Products = await Product.find();
    res.json(Products);
}

const postProducts = async (req, res) => {
    const newProduct = await Product.create(req.body)
    res.json(newProduct);
    // res.json('lililililili');
}

const getById = async (req, res) => {
    // 这里注意！！！ id在req的参数里！！！
    // 解构里的名称，要和product.js文件中，路径中变量名一致
    const { productId } = req.params;

    // 这里的方法是findById
    const product = await Product.findById(productId);
    res.json(product)
}


const findByIdAndUpdate1 = async (req, res) => {

    const { productId } = req.params;
    const updatesproduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }); // 这个函数返回的是objecto previo actualizacion
    res.json(updatesproduct);
}


const remove = async (req, res) => {
    const { productId } = req.params;
    const productoBorrado = await Product.findByIdAndDelete(productId);
    res.json(productoBorrado);
}

module.exports = {
    getProducts, postProducts, getById, findByIdAndUpdate1, remove
}