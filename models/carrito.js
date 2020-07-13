const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Articulo = require('./articulo');
const { Schema } = mongoose;

const CarritoSchema = new Schema({
    articulos: { type: [Schema.Types.ObjectId], ref: Articulo, required: false },
    total: { type: number, default: 0 }
});
module.exports = mongoose.model('Carrito', CarritoSchema);