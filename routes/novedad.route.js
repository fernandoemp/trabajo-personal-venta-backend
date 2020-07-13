//creamos un manejador de rutas modulars
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

//defino controlador para el manejo de CRUD
const novedadCtrl = require('./../controllers/novedad.controller');

// definiendo rutas
router.get('/', novedadCtrl.getNovedades);
router.get('/sinProcesar', novedadCtrl.getNovedadSinProcesar); //para el numero en el header
router.post('/', auth, novedadCtrl.createNovedad);
router.get('/:id', AuthAdministrativoAdministrador, novedadCtrl.getNovedad);
router.put('/:id', AuthAdministrativoAdministrador, novedadCtrl.editNovedad);
router.delete('/:id', authAdministrador, novedadCtrl.deleteNovedad);

//exportacion del modulo de rutas
module.exports = router;