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
      <button onClick={() => setShowModal(true)}>Registrarse</button>
      {showModal && (
        <div className="modal z-50">
          <div className="bg-verde-500 flex flex-col items-center justify-center p-12 text-white gap-6 rounded-md shadow-md w-3/4 lg:3/5" ref={modalRef}>
            <span className="close pointer" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Por favor ingrese sus datos</h2>
            <form className='text-verde-700 font-500 w-full flex flex-wrap gap-6 flex-col' onSubmit={handleSubmit}>
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="password" name="confirmarContraseña" placeholder="Confirmar Contraseña" value={formData.confirmarContraseña} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
              <select className="bg-verde-100 px-4 py-2 lg:py-1 shadow-md rounded-2xl" name="rol" value={formData.rol} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
              <button className="bg-verde-300 px-4 py-2 lg:py-1 shadow-md rounded-2xl" type="submit">Registrate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;

