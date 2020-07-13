console.log("cargó a noticia.route");
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const AuthAdministrativoAdministrador = require('../middlewares/authAdministrativoAdministrador')
const authAdministrador = require('../middlewares/authAdministrador')

const noticiaCtrl = require('./../controllers/noticia.controller');

router.get('/', noticiaCtrl.getnoticias);
router.get('/vigentes', noticiaCtrl.getnoticiasVigentes);
router.post('/', AuthAdministrativoAdministrador, noticiaCtrl.createnoticia);
router.get('/:id', AuthAdministrativoAdministrador, noticiaCtrl.getnoticia);
router.put('/:id', AuthAdministrativoAdministrador, noticiaCtrl.editnoticia);
router.delete('/:id', AuthAdministrativoAdministrador, noticiaCtrl.deletenoticia);

module.exports = router;