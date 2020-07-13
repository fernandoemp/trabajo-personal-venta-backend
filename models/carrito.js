const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Articulo = require('./articulo');
const { Schema } = mongoose;

const CarritoSchema = new Schema({
    articulos: { type: [Articulo.schema], required: false },
    total: { type: Number, default: 0 }
});
module.exports = mongoose.model('Carrito', CarritoSchema);