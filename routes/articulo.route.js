const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

const articuloCtrl = require('./../controllers/articulo.controller');

router.get('/', articuloCtrl.getArticulos);
router.post('/', auth, articuloCtrl.createArticulo);
router.put('/:id', articuloCtrl.editArticulo);
router.get('/:id', articuloCtrl.getArticulo);
router.delete('/:id', articuloCtrl.deleteArticulo);

//exportacion del modulo de rutas
module.exports = router;