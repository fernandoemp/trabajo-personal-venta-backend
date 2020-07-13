const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropietarioSchema = new Schema({
    apellido: { type: String, required: true },
    nombres: { type: String, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    teléfono: { type: Number, required: true },
    dirección: { type: String, required: true },
    borrado: { type: Boolean, default: false, required: true }
})

module.exports = mongoose.model('Propietario', PropietarioSchema);