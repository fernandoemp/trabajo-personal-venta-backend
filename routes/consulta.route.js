const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

const consultaCtrl = require('./../controllers/consulta.controller');

router.get('/', consultaCtrl.getConsultas);
router.get('/sinProcesar', consultaCtrl.getConsultasSinProcesar); //para el numero en el header
router.post('/', auth, consultaCtrl.createConsulta);
router.put('/:id', AuthAdministrativoAdministrador, consultaCtrl.editConsulta);
router.delete('/:id', authAdministrador, consultaCtrl.deleteConsulta);

//exportacion del modulo de rutas
module.exports = router;