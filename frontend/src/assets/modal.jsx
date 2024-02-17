import { useState, useRef, useEffect } from 'react';

function Modal({ api, addAlert }) {
  const initialState = {
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: '',
    confirmarContraseña: '',
    email: '',
    telefono: '',
    rol: 'usuario', // Por defecto, el rol es usuario
  };

  const [formData, setFormData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos, como enviarlos a un servidor
    registrarUsuario(`${api}/registrar`, formData);
    setShowModal(false);
    clearForm(); // Limpia el formulario después de enviarlo
  };

  const clearForm = () => {
    setFormData(initialState); // Establece el estado del formulario en su estado inicial
  };

  const registrarUsuario = async (api, formData) => {
    const { usuario, nombre, apellido, email, contraseña, confirmarContraseña, rol, telefono } = formData;

    if (contraseña !== confirmarContraseña) {
      addAlert("Las contraseñas no coinciden", "error"); // Agrega una alerta de error
      return;
    }

    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'usuario': usuario,
        'nombre': `${nombre} ${apellido}`,
        'correo': email,
        'clave': contraseña,
        'telefono': telefono,
        'rol': rol,
      })
    })
      .then(res => res.json())
      .then(data => {
        addAlert(data.mensaje, "success"); // Agrega una alerta de éxito
      })
      .catch(err => {
        console.log(err);
        addAlert("Ocurrió un error al registrar usuario", "error"); // Agrega una alerta de error
      });
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Abrir Modal</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Por favor ingrese sus datos</h2>
            <form className='text-black' onSubmit={handleSubmit}>
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
              <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} />
              <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
              <input type="password" name="confirmarContraseña" placeholder="Confirmar Contraseña" value={formData.confirmarContraseña} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
              <button type="submit">Registrate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;

