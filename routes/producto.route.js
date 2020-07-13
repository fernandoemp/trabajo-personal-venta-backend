const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

const productoCtrl = require('./../controllers/producto.controller');

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.put('/:id', productoCtrl.editProducto);
router.get('/:id', productoCtrl.getProducto);
router.delete('/:id', productoCtrl.deleteProducto);
//exportacion del modulo de rutas
module.exports = router;