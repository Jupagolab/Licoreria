const express = require('express');
const router = express.Router();
const inventarioC = require('../controllers/inventario-c');

//GET
// OBTENER TODOS LOS PRODUCTOS
router.get('/', (req, res) => {
  inventarioC.buscarInventario(req, res);
});


//POST
router.post('/', (req, res) => {
  inventarioC.guardarProducto(req, res);
});


module.exports = router;