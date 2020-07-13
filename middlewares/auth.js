'use strict'

const tokenService = require('../services/tokenService');
const config = require('../config')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false, message: 'No tienes autorizacion', permiso: null })
    }
    // si envia un token, entonces lo recupero en la variable token para analizar si es correcta
    const token = req.headers.authorization.split(' ')[1] // la primera palabra es Bearer y luego el token

    tokenService.decodeToken(token) //envio el token recibido al service para comprobar su valides
        .then(response => {
            if (response.perfil == "Propietario" || response.perfil == "Administrativo" || response.perfil == "Administrador") {
                req.user = response.usuario;
                next()
            } else {
                return res.status(403).send({ auth: false, message: 'No tienes autorizacion', permiso: null, perfil: response.perfil, usuario: response.usuario })
            }
        })
        .catch(response => {
            res.status(403).send({ response, status: 403, permiso: null })
        })
}
module.exports = isAuth