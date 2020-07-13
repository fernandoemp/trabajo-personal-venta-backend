'use strict'

const tokenService = require('../services/tokenService');
const config = require('../config')

function isAuthAdministrativoAdministrador(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false, message: 'No tienes autorizacion', permiso: null, status: 403 })
    }
    const token = req.headers.authorization.split(' ')[1]
    tokenService.decodeToken(token)
        .then(response => {
            if ((response.perfil == "Administrativo") || (response.perfil == "Administrador")) {
                req.user = response.usuario;
                next()
            } else {
                return res.status(403).send({ auth: false, message: 'No tienes autorizacion', permiso: null, perfil: response.perfil, usuario: response.usuario })
            }
        })
        .catch(response => {
            res.status(403).send({ response, message: 'error de token', permiso: null });
        })
}
module.exports = isAuthAdministrativoAdministrador