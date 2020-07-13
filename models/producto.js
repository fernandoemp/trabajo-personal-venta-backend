const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    titulo: { type: String, required: true },
    descripción: { type: String, required: true },
    precio: { type: Number, required: true },
    tallas: { type: String, required: false },
    colores: { type: String, required: false },
    medidas: { type: String, required: false },
    genero: { type: String, required: false },
    descuento: { type: Number, required: true, default: 0 },
    stock: { type: number, required: true, default: 0 }
})

module.exports = mongoose.model('Producto', ProductoSchema);