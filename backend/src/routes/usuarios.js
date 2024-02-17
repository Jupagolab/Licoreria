const express = require('express');
const router = express.Router();
const usuariosC = require('../controllers/usuarios-c');

// ---------------------  POST  --------------------
// REGISTRAR USUARIO
router.post('/registrar', (req, res)=>{
  usuariosC.crearUsuario(req, res);
});

// LOGGEAR USUARIO
router.post('/login', (req, res)=>{
  usuariosC.iniciarSesion(req, res);
});


module.exports = router;