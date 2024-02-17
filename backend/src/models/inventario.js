const {Schema, model} = require('mongoose');

const inventarioEsquema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  volumen: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const inventario = model('inventario', inventarioEsquema);

module.exports = inventario;