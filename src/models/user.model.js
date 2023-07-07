const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'regular' // 不写的话，自动为regular
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]  // 将user和product两个表格关联起来
},
    {
        timestamps: true, versionKey: false
    })

module.exports = model('user', userSchema)