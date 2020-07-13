const Novedad = require('../models/novedad');
const Usuario = require('../models/usuario');
const novedadCtrlr = {}


novedadCtrlr.getNovedades = async(req, res) => {
    await Novedad.find().populate("usuario", "-password").exec(function(error, novedades) {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}` })
        if (!novedades) return res.status(404).send({ message: "No existen novedades" })
        res.status(200).send({ novedades })
    })
}

//solo para saber la cantidad de novedades pendientes para mostrar ese numero arriba de novedades en el header
novedadCtrlr.getNovedadSinProcesar = async(req, res) => {
    novedades = await Novedad.find({ "estado": 'Pendiente' });
    res.json(novedades);
}

novedadCtrlr.createNovedad = async(req, res) => {
    console.log('entró a create novedad')
    let novedad = new Novedad(req.body);
    let _id = req.body.usuario._id
    const usu = await Usuario.findById({ _id }, (err, user) => {
        if (err) return res.status(500).send({ message: `Error al obtener el usuario: ${err}`, status: 500 })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado', status: 404 })
        novedad.usuario = user;
    })
    await novedad.save((error, novedad) => {
        if (error) return res.status(500).send({ message: `Error al crear la novedad: ${error}` })
        res.status(201).send({ message: "La novedad ha sido creada", status: 201 })
    })
}

novedadCtrlr.editNovedad = async(req, res) => {

    const vNovedad = new Novedad(req.body);
    await Novedad.findByIdAndUpdate(req.params.id, { $set: vNovedad }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!modificado) return res.status(404).send({ message: "Novedad no encontrada" })
        res.status(200).send({ modificado, status: 200 })
    })
}

novedadCtrlr.getNovedad = async(req, res) => {
    await Novedad.findById(req.params.id).populate("usuario").exec(function(error, novedad) {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}` })
        if (!novedad) return res.status(404).send({ message: "La novedad no existe" })
        res.status(200).send({ novedad })
    })
}

novedadCtrlr.deleteNovedad = async(req, res) => {
    await Novedad.findByIdAndRemove(req.params.id, (error, novedad) => {
        if (error) return res.status(500).send({ message: `Error al borrar la novedad: ${error}` })
        if (!novedad) return res.status(404).send({ message: "La novedad no existe" })
        res.status(200).send({ message: "La novedad ha sido borrada", status: 200 })
    })
}
module.exports = novedadCtrlr;