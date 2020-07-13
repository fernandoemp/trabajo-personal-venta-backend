console.log("cargo propietario.route");
//creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

//defino controlador para el manejo de CRUD
const propietarioCtrl = require('../controllers/propietario.controller');

// definiendo rutas
router.get('/', AuthAdministrativoAdministrador, propietarioCtrl.getPropietarios);
router.post('/', AuthAdministrativoAdministrador, propietarioCtrl.createPropietario);
router.get('/:id', auth, propietarioCtrl.getPropietario);
router.put('/:id', auth, propietarioCtrl.editPropietario);
router.delete('/:id', authAdministrador, propietarioCtrl.deletePropietario);
router.get('/email/:email', auth, propietarioCtrl.findPropietarioByEmail);

//exportacion del modulo de rutas
module.exports = router;