'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(usuario) {
    // los datos que viajan...
    const payload = {
        sub: usuario._id,
        usuario: usuario.usuario,
        perfil: usuario.perfil,
        iat: moment().unix(), //libreria moment nos ayuda a manejar fechas en js
        exp: moment().add(14, 'days').unix() // en 14 dias expira... cuanto tiempo es el ideal?
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => { //resolve : cuando se resuelve la funcion, reject: cuando ha ocurrido un error
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload); // muestro el payload decodificado

        } catch (err) {
            reject({
                status: 500,
                message: 'Token Invalido'
            })
        }
    })
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}