const producto = require('../models/inventario');

class InventarioController {
  buscarInventario = async (req, res) => {
    try {
      const productos = await producto.find();
      res.json(productos);

    } catch (err) {
      res.status(500).json({ error: "Error al realizar la consulta" });
    }
  }

  guardarProducto = async (req, res) => {
    try {
      const { nombre, marca, tipo, volumen, cantidad, precio, imagen } = req.body;
      const nuevoProducto = new producto({ nombre, marca, tipo, volumen, cantidad, precio, imagen });
      await nuevoProducto.save();
      res.json({ mensaje: 'Producto guardado en el inventario con éxito' });
    } catch (err) {
      console.log(err);
      res.status(404).json({ mensaje: `Error: ${err} ` })
    }
  };
}

const inventario = new InventarioController();

module.exports = inventario;