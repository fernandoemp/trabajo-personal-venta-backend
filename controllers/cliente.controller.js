const Cliente = require('../models/cliente');

const clienteCtlr = {}

clienteCtlr.getClientes = async(req, res) => {
    await Cliente.find({}, (error, clientes) => {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}`, status: 500 })
        if (!clientes) return res.status(404).send({ message: "No existen clientes", status: 404 })
        res.status(200).send({ clientes, status: 200 })
    })
}

clienteCtlr.createCliente = async(req, res) => {
    const cliente = new Cliente(req.body);
    var cli = await Cliente.findOne({ "dni": cliente.dni });
    if (cli) return res.status(403).send({ message: "El dni ya se encuentra registrado", status: 403 });
    prop = await Cliente.findOne({ "email": cliente.email });
    if (cli) return res.status(401).send({ message: "El e-mail ya se encuentra registrado", status: 401 });
    await cliente.save();
    res.json({
        status: 201
    });
}

clienteCtlr.getCliente = async(req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
}

clienteCtlr.editCliente = async(req, res) => {
    const oCliente = new Cliente(req.body);
    await Cliente.findByIdAndUpdate(req.params.id, { $set: oCliente }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`, status: 500 })
        if (!modificado) return res.status(404).send({ message: "Cliente no encontrado", status: 404 })
        res.status(200).send({ status: 200, modificado })
    })
}
clienteCtlr.deleteCliente = async(req, res) => {
    await Cliente.findByIdAndRemove(req.params.id)
    res.json({
        status: 200
    })
}

clienteCtlr.findClienteByEmail = async(req, res) => {
    await Cliente.findOne({ "email": req.params.email }, (err, cliente) => {
        if (err) return res.status(500).send({ message: 'Error interno. Contacte al administrador', status: 500 })
        if (!cliente) return res.status(404).send({ message: 'Cliente no encontraro', status: 404 })
        return res.status(200).send({ cliente: cliente, status: 200 })
    })
}

module.exports = clienteCtlr;