const { exists } = require('../models/product.model');
const User = require('../models/user.model');


const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.json({ Error: err.message })
    }

}

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser);
    } catch (err) {
        res.json({ Error: err.message })
    }
}


const buyProduct = async (req, res) => {
    const { userId, productId } = req.params;

    // 找到相关的user
    const user = await User.findById(userId);

    // 这个user的模型中的数组products添加url传来的产品id
    user.products.push(productId);   // como products es un array, usamos push para anadir producto nuevo
    await user.save();

    res.json(user);
}

module.exports = {
    createUser, buyProduct, getAll
}