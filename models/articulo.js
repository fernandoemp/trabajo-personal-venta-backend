const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Producto = require('./producto');
const { Schema } = mongoose;

const ArticuloSchema = new Schema({
    producto: { type: [Schema.Types.ObjectId], ref: Producto, required: false },
    cantidad: { type: number, default: 1, required: true },
    total: { type: number, default: 0 }
});
module.exports = mongoose.model('Articulo', ArticuloSchema);