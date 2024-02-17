const {Schema, model} = require('mongoose');

const UsuarioEsquema = new Schema({
  usuario: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
},{
  timestamps: true
});

const usuarios = model('usuarios', UsuarioEsquema);

module.exports = usuarios;