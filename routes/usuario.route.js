const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const authAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')
const usuarioCtrl = require('./../controllers/usuario.controller');

// definiendo rutas
router.get('/', auth, usuarioCtrl.getUsuarios);
router.put('/:id', auth, usuarioCtrl.editUsuario);
router.put('/change/:id', auth, usuarioCtrl.setNewPasswordUsuario);
router.put('/bann/:email', usuarioCtrl.bannUsuario);
router.post('/signup', usuarioCtrl.signUp); //registro
router.post('/signin', usuarioCtrl.signIn); //login
router.post('/signinFB', usuarioCtrl.signInFB); //loginFB
// router.get('/user', usuarioCtrl.getUser); // obsoleto
router.get('/mensaje/:id&:fechaprocesado', auth, usuarioCtrl.findMensajeUsuario);
router.get('/:id', auth, usuarioCtrl.getUsuario);
router.get('/email/:email', auth, usuarioCtrl.getUsuarioByEmail);
router.delete('/:id', authAdministrador, usuarioCtrl.deleteUsuario);
//exportacion del modulo de rutas
module.exports = router;