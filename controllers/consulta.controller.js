const Consulta = require('../models/consulta');
const Usuario = require('../models/usuario');
const consultaCtrl = {}

consultaCtrl.getConsultas = async(req, res) => {
    await Consulta.find().exec(function(error, consultas) {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}` })
        if (!consultas) return res.status(404).send({ message: "No existen consultas" })
        res.status(200).send({ consultas })
    })
}

consultaCtrl.getConsultasSinProcesar = async(req, res) => {
    consultas = await Consulta.find({ "estado": 'Pendiente' });
    res.json(consultas);
}

consultaCtrl.createConsulta = async(req, res) => {
    let consulta = new Consulta(req.body);
    const usu = await Usuario.findOne({ usuario: consulta.usuario }, (err, consulta) => {
        if (err) return res.status(500).send({ message: `Error al obtener el usuario: ${err}`, status: 500 })
        if (!consulta) return res.status(404).send({ message: 'Usuario no encontrado', status: 404 })
        res.status(200).send({ status: 201 })
    })
    await consulta.save((error, consulta) => {
        if (error) return res.status(500).send({ message: `Error al crear la consulta: ${error}` })
        res.status(201).send({ message: "La consulta ha sido creada", status: 201 })
    })
}

consultaCtrl.editConsulta = async(req, res) => {
    const vConsulta = new Consulta(req.body);
    await Consulta.findByIdAndUpdate(req.params.id, { $set: vConsulta }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!modificado) return res.status(404).send({ message: "Consulta no encontrada" })
        res.status(200).send({ modificado, status: 200 })
    })
}

consultaCtrl.deleteConsulta = async(req, res) => {
    await Consulta.findByIdAndRemove(req.params.id, (error, consulta) => {
        if (error) return res.status(500).send({ message: `Error al borrar la consulta: ${error}` })
        if (!consulta) return res.status(404).send({ message: "La consulta no existe" })
        res.status(200).send({ message: "La consulta ha sido borrada", status: 200 })
    })
}
module.exports = consultaCtrl;