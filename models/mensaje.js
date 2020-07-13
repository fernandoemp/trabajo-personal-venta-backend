const mongoose = require('mongoose');
const { Schema } = mongoose;

const MensajeSchema = new Schema({
    usuarioRemitente: { type: String, required: true },
    usuarioDestinatario: { type: String, required: true },
    asunto: { type: String, required: true },
    texto: { type: String, required: true },
    leido: { type: Boolean, default: false, required: false },
    fechaEnviado: { type: Date, require: false }
})

module.exports = mongoose.model('Mensaje', MensajeSchema);