const bcrypt = require('bcrypt');

const encriptarContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  return hash;
};

// Middleware para encriptar la contraseña antes de guardarla
const encriptarContrasenaMiddleware = async (req, res, next) => {
  try {
    if (!req.body.clave) {
      return next();
    }
    const hash = await encriptarContrasena(req.body.clave);
    req.body.clave = hash;
    next();
  } catch (error) {
    res.status(500).json({mensaje: 'Error al encriptar la contraseña', error});
  }
};

const compare = async (Clave, ClaveEncrypt) => {
  return await bcrypt.compare(Clave,ClaveEncrypt)
}


module.exports = { encriptarContrasenaMiddleware, compare };