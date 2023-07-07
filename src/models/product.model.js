const { model, Schema } = require('mongoose');

// 保证所有的数据都有一个大致的样子
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number
}, {
    // 这个genera dos campos mas sobre fecha (一个是创建时的fecha， 另一个是更新时的)
    timestamps: true,
    versionKey: false
})

// lanzar esta estructura
module.exports = model('product', productSchema);