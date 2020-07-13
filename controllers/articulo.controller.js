const Articulo = require('../models/articulo');
const articuloCtrl = {}

articuloCtrl.getArticulos = async(req, res) => {
    await Articulo.find().exec(function(error, articulos) {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}` })
        if (!articulos) return res.status(404).send({ message: "No existen articulos" })
        res.status(200).send({ articulos })
    })
}

articuloCtrl.createArticulo = async(req, res) => {
    const vArticulo = new Articulo(req.body);
    await vArticulo.save((error, art) => {
        if (error) return res.status(500).send({ message: `Error al crear el articulo: ${error}` })
        res.status(201).send({ message: "El articulo ha sido creado", status: 201 })
    })
}

articuloCtrl.editArticulo = async(req, res) => {
    const vArticulo = new Articulo(req.body);
    await Articulo.findByIdAndUpdate(req.params.id, { $set: vArticulo }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!modificado) return res.status(404).send({ message: "Articulo no encontrada" })
        res.status(200).send({ modificado, status: 200 })
    })
}

articuloCtrl.deleteArticulo = async(req, res) => {
    await Articulo.findByIdAndRemove(req.params.id, (error, art) => {
        if (error) return res.status(500).send({ message: `Error al borrar el articulo: ${error}` })
        if (!art) return res.status(404).send({ message: "El articulo no existe" })
        res.status(200).send({ message: "El articulo ha sido borrada", status: 200 })
    })
}

articuloCtrl.getArticulo = async(req, res) => {
    const articulo = await Articulo.findById(req.params.id, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` });
        if (!result) return res.status(404).send({ status: 404, message: 'Articulo no encontrado' });
        return res.status(200).send({ status: 200, articulo: result });
    });
}

module.exports = articuloCtrl;