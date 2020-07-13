const Usuario = require('./../models/usuario');
const Propietario = require('./../models/propietario');
const tokenService = require('../services/tokenService');
const bcrypt = require("bcrypt-nodejs");
const { findOne, findById } = require('./../models/usuario');
const Mensaje = require('../models/mensaje');
const usuarioCtrl = {}

usuarioCtrl.signUp = async(req, res) => {
    const usuario = new Usuario(req.body);
    if (usuario.perfil == "Propietario") {
        const prop = await Propietario.findOne({ "email": usuario.usuario });
        if (!prop) return res.status(404).send({ message: "El propietario aun no se encuentra registrado" });
    }

    const user = await Usuario.findOne({ "usuario": usuario.usuario });
    if (user) return res.status(403).send({ message: "El usuario ya se encuentra registrado" });
    await usuario.save((err) => {
        if (err) return res.status(500).send({ message: 'Error al crear el usuario:' });
        return res.status(201).send({ message: 'Usuario creado con exito', status: 201 });
    })
}

usuarioCtrl.signIn = async(req, res) => {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ "usuario": usuario }, "-mensajes -borrado -mensajes -fechaAltaUsuario")
    if (!user) return res.status(404).send({ message: "El usuario no existe" })
    if (user.activo == false) {
        return res.status(423).send({ auth: false, token: null, status: 423, message: 'Su cuenta se encuentra bloqueda' })
    }
    const passwordValida = await user.compararPassword(password, (err, encontrado) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion' })
        if (!encontrado) return res.status(403).send({ auth: false, token: null, message: 'Contraseña erronea' })

        user.password = null;
        res.status(200).send({
            auth: true,
            token: tokenService.createToken(user),
            status: 200,
            usuario: user
        })
    })
}

usuarioCtrl.signInFB = async(req, res) => {
    const user = req.body;
    //si hubiera algun rol mas, aparte de propieatario habria q hacer un nueo "create token", referido a fb 
    res.status(200).send({
        auth: true,
        token: tokenService.createToken(user),
        status: 200,
        usuario: user
    })
}

usuarioCtrl.getUser = async(req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false, message: 'No tienes autorizacion' })
    }
    const token = req.headers.authorization.split(' ')[1]
    tokenService.decodeToken(token)
        .then(response => {
            //let usuario = response.usuario;
            res.status(200).send({ usuario: response.usuario, perfil: response.perfil, _id: response.sub })
        })
        .catch(response => {
            res.status(403).send({ message: 'Error usuario invalido' })
        })
}

usuarioCtrl.getUsuarios = async(req, res) => {
    await Usuario.find({}, "-password", (error, usuarios) => {
        if (error) return res.status(500).send({ message: `Error al realizar la peticion: ${error}`, status: 500 })
        if (!usuarios) return res.status(404).send({ message: "No existen usuarios", status: 404 })
        res.status(200).send({ usuarios, usuario: req.user })
    })
}

usuarioCtrl.editUsuario = async(req, res) => {
    const oUsuario = new Usuario(req.body);
    console.log('usuario que llego');
    console.log(oUsuario);
    const user = Usuario.findById(req.params.id);
    oUsuario.password = user.password;
    await Usuario.findByIdAndUpdate(req.params.id, { $set: oUsuario }, { new: true }, (err, modificado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`, status: 500 })
        if (!modificado) return res.status(404).send({ message: "Usuario no encontrado", status: 404 })
        res.status(200).send({ status: 200, modificado })
    })
}

usuarioCtrl.findMensajeUsuario = async(req, res) => {
    let user = new Usuario();
    user = await Usuario.findById(req.params.id, (err, usu) => {
        if (err) return res.status(500).send({ message: 'Error interno', status: 500 });
        if (!usu) return res.status(404).send({ status: 404, message: 'Usuario no encontrado' });
    });
    let parametroFecha = new Date(req.params.fechaprocesado).getTime();
    let mensajeEncontrado = null;
    user.mensajes.forEach(element => {
        let msj = new Mensaje();
        Object.assign(msj, element);
        let fechaEnviado = new Date(msj.fechaEnviado).getTime();
        if (fechaEnviado === parametroFecha) {
            mensajeEncontrado = msj;
        }
    });
    if (mensajeEncontrado == null) {
        return res.status(404).send({ status: 404, message: 'Mensaje no encontrado' });
    } else {
        return res.status(200).send({ mensaje: mensajeEncontrado, status: 200 });
    }
}

/*Se realiza esto porque al estar "encryptada" con hash, es imposible alterarlo, ni setearle un nuevo hash, da error al iniciar sesion"*/
usuarioCtrl.setNewPasswordUsuario = async(req, res) => {
    var usuarioEnviado = new Usuario(req.body);
    var nuevo = new Usuario(req.body);
    nuevo.password = usuarioEnviado.password;
    nuevo._id = null;
    await Usuario.findByIdAndRemove(req.params.id);
    await nuevo.save((err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` })
        return res.status(200).send({ status: 200, message: 'Contraseña modificada con exito' });
    })
}

usuarioCtrl.getUsuario = async(req, res) => {
    const usuario = await Usuario.findById(req.params.id, "-password", (err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` });
        if (!result) return res.status(404).send({ status: 404, message: 'Usuario no encontrado' });
        return res.status(200).send({ status: 200, usuario: result });
    });
}

usuarioCtrl.getUsuarioByEmail = async(req, res) => {
    const usuario = await Usuario.findOne({ "usuario": req.params.email }, "-mensajes -password -fotoPerfil", (err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` });
        if (!result) return res.status(404).send({ status: 404, message: 'Usuario no encontrado' });
        res.status(200).send({ status: 200, usuario: result });
    });
}

usuarioCtrl.bannUsuario = async(req, res) => {
    var usuario = await Usuario.findOne({ "usuario": req.params.email }, (err, result) => {
        if (err) return res.status(500).send({ message: `Error al realizar la accion: ${err}` });
        if (!result) return res.status(404).send({ status: 404, message: 'Usuario no encontrado' });
    });
    usuario.activo = false;
    await Usuario.findByIdAndUpdate(usuario._id, { $set: usuario }, { new: true }, (err, bloqueado) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`, status: 500 })
        if (!bloqueado) return res.status(404).send({ message: "Usuario no encontrado", status: 404 })
        res.status(200).send({ status: 200, message: 'usuario bloqueado' })
    })
}
usuarioCtrl.deleteUsuario = async(req, res) => {
    await Usuario.findByIdAndRemove(req.params.id)
    res.json({
        status: 200
    })
}

module.exports = usuarioCtrl;