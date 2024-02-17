const usuarios = require('../models/usuarios');
const { SECRET } = process.env;
const { tokenSign } = require('../middleware/auth');
const bcrypt = require('../middleware/bcrypt');

class UsuarioController {
  crearUsuario = async (req, res) => {
    try {
      await bcrypt.encriptarContrasenaMiddleware(req, res, async () => {
        const { usuario, nombre, correo, clave, telefono,rol } = req.body;

        const nuevoUsuario = new usuarios({ usuario, nombre, correo, clave, telefono, rol });
        await nuevoUsuario.save();

        res.json({ mensaje: 'Usuario registrado con éxito' });
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: `Error en el servidor: ${error}` });
    }
  };

  iniciarSesion = async (req, res) => {
    try {
      if (!req.body.usuario || !req.body.clave) {
        return res.status(500).json({ mensaje: "Se requiere Usuario y Contraseña para inciar sesión" });
      }

      const { usuario, clave } = req.body;

      const buscarUsuario = await usuarios.findOne({ usuario });

      if (!buscarUsuario) {
        return res.status(500).json({ mensaje: "Credenciales inválidas" });
      }

      // Verificar la contraseña
      const claveValida = await bcrypt.compare(clave, buscarUsuario.clave);

      // Si la contraseña es inválida, enviar una respuesta de error
      if (!claveValida) {
        return res.status(401).json({ mensaje: 'Contraseña inválida' })
      }

      const token = tokenSign({
        'usuario': buscarUsuario.usuario,
        'rol': buscarUsuario.rol,
      });

      res.json({ 'token': token })

    } catch (err) {
      return res.status(500).json({ mensaje: `Error en el servidor ${err}` });
    }
  };
}

const usuario = new UsuarioController;

module.exports = usuario;