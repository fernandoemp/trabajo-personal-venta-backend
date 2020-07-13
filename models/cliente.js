const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    apellidos: { type: String, required: true },
    nombres: { type: String, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    direccion: { type: String, required: true },
    borrado: { type: Boolean, default: false, required: true }
})

module.exports = mongoose.model('Cliente', ClienteSchema);