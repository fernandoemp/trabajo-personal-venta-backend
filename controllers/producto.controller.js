const Producto = require('../models/producto');
const productoCtrl = {}

productoCtrl.getProductos = async(req, res) => {
    await Producto.find().exec(function(error, productos) {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}` })
        if (!productos) return res.status(404).send({ message: "No existen productos" })
        res.status(200).send({ productos })
    })
}

productoCtrl.createProducto = async(req, res) => {
    const vProducto = new Producto(req.body);
    await vProducto.save((error, art) => {
        if (error) return res.status(500).send({ message: `Error al crear el articulo: ${error}` })
        res.status(201).send({ message: "El articulo ha sido creado", status: 201 })
    })
}

productoCtrl.editProducto = async(req, res) => {
    const vProducto = new Producto(req.body);
    await Producto.findByIdAndUpdate(req.params.id, { $set: vProducto }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        if (!modificado) return res.status(404).send({ message: "Producto no encontrada" })
        res.status(200).send({ modificado, status: 200 })
    })
}

productoCtrl.deleteProducto = async(req, res) => {
    await Producto.findByIdAndRemove(req.params.id, (error, art) => {
        if (error) return res.status(500).send({ message: `Error al borrar el producto: ${error}` })
        if (!art) return res.status(404).send({ message: "El producto no existe" })
        res.status(200).send({ message: "El producto ha sido borrado", status: 200 })
    })
}

productoCtrl.getProducto = async(req, res) => {
    const producto = await Producto.findById(req.params.id, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` });
        if (!result) return res.status(404).send({ status: 404, message: 'Producto no encontrado' });
        return res.status(200).send({ status: 200, producto: result });
    });
}
module.exports = productoCtrl;