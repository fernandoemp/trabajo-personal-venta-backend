const Propietario = require('../models/propietario');

const propietarioCtlr = {}

propietarioCtlr.getPropietarios = async(req, res) => {
    await Propietario.find({}, (error, propietarios) => {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}`, status: 500 })
        if (!propietarios) return res.status(404).send({ message: "No existen usuarios", status: 404 })
        res.status(200).send({ propietarios, status: 200 })
    })
}

propietarioCtlr.createPropietario = async(req, res) => {
    const propietario = new Propietario(req.body);
    var prop = await Propietario.findOne({ "dni": propietario.dni });
    if (prop) return res.status(403).send({ message: "El dni ya se encuentra registrado", status: 403 });
    prop = await Propietario.findOne({ "email": propietario.email });
    if (prop) return res.status(401).send({ message: "El e-mail ya se encuentra registrado", status: 401 });
    await propietario.save();
    res.json({
        status: 201
    });
}

propietarioCtlr.getPropietario = async(req, res) => {
    const propietario = await Propietario.findById(req.params.id);
    res.json(propietario);
}

propietarioCtlr.editPropietario = async(req, res) => {
    const oPropietario = new Propietario(req.body);
    console.log(oPropietario);
    const prop = Propietario.findById(req.params.id);
    await Propietario.findByIdAndUpdate(req.params.id, { $set: oPropietario }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`, status: 500 })
        if (!modificado) return res.status(404).send({ message: "Propietario no encontrado", status: 404 })
        res.status(200).send({ status: 200, modificado })
    })
}
propietarioCtlr.deletePropietario = async(req, res) => {
    await Propietario.findByIdAndRemove(req.params.id)
    res.json({
        status: 200
    })
}

propietarioCtlr.findPropietarioByEmail = async(req, res) => {
    const user = await Propietario.findOne({ "email": req.params.email }, (err, propietario) => {
        if (err) return res.status(500).send({ message: 'Error interno. Contacte al administrador', status: 500 })
        if (!propietario) return res.status(404).send({ message: 'Propietario no encontraro', status: 404 })
        return res.status(200).send({ propietario, status: 200 })
    })
}

module.exports = propietarioCtlr;