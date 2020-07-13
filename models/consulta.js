const mongoose = require("mongoose");
const Usuario = require("./usuario");
const Mensaje = require("./mensaje");
const { Schema } = mongoose;

const ConsultaSchema = new Schema({
    texto: { type: String, required: true },
    asunto: { type: String, required: true },
    fechaConsulta: { type: Date, default: null, required: false },
    usuario: { type: String, required: false },
    estado: { type: String, default: 'Pendiente', enum: ['Pendiente', 'Procesado'], required: true },
    borrado: { type: Boolean, default: false, required: false },
    procesadoPor: { type: String, default: null, required: false },
    fechaProcesado: { type: Date, default: null, required: false },
    fechaRespuesta: { type: Date, default: null, required: false }
});

module.exports = mongoose.model('Consulta', ConsultaSchema);