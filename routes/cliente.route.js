console.log("cargo propietario.route");
//creamos un manejador de rutas modulares
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

//defino controlador para el manejo de CRUD
const clienteCtrl = require('../controllers/cliente.controller');

// definiendo rutas
router.get('/', AuthAdministrativoAdministrador, clienteCtrl.getClientes);
router.post('/', AuthAdministrativoAdministrador, clienteCtrl.createCliente);
router.get('/:id', auth, clienteCtrl.getCliente);
router.put('/:id', auth, clienteCtrl.editCliente);
router.delete('/:id', authAdministrador, clienteCtrl.deleteCliente);
router.get('/email/:email', auth, clienteCtrl.findClienteByEmail);

//exportacion del modulo de rutas
module.exports = router;