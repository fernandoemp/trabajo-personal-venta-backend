const Noticia = require('../models/noticia');

const noticiaCtrl = {}

noticiaCtrl.getnoticias = async(req, res) => {
    console.log("entró a getnoticias");
    noticias = await Noticia.find().populate("usuario");
    res.json(noticias);
}

//traer las vigentes y por fecha
noticiaCtrl.getnoticiasVigentes = async(req, res) => {
    console.log("entró a getnoticias vigente");
    noticias = await Noticia.find({ "vigente": true }).sort({ fecha: -1 });
    res.json(noticias);
}

noticiaCtrl.createnoticia = async(req, res) => {
    console.log("entró createnoticia");
    const noticia = new Noticia(req.body);
    await noticia.save();
    res.json({
        'status': 'noticia saved'
    });
}

noticiaCtrl.editnoticia = async(req, res) => {
    console.log("entró a editnoticia");
    const vnoticia = new Noticia(req.body);
    await Noticia.findByIdAndUpdate(req.params.id, { $set: vnoticia }, { new: true });
    res.json({
        'status': 'noticia updated'
    })
}

noticiaCtrl.getnoticia = async(req, res) => {
    console.log("entró a getnoticia");
    const noticia = await Noticia.findById(req.params.id).populate("usuario");
    res.json(noticia);
}

noticiaCtrl.deletenoticia = async(req, res) => {
    console.log("entró a deletenoticia");
    await Noticia.findByIdAndRemove(req.params.id)
    res.json({
        status: 'noticia removed'
    })
}

module.exports = noticiaCtrl;