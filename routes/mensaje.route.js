//creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

//defino controlador para el manejo de CRUD
const mensajeCtrl = require('../controllers/mensaje.controller');

// No se usan...
router.get('/', mensajeCtrl.getMensajes);
router.post('/', mensajeCtrl.createMensaje);
router.put('/:id', mensajeCtrl.editMensaje);
router.delete('/:id', mensajeCtrl.deleteMensaje);

//exportacion del modulo de rutas
module.exports = router;