import { useState } from 'react';
import Cookies from 'js-cookie';

function Login({ api, setRol }) {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    await fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'usuario': usuario,
        'clave': clave,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // Agrega una alerta de éxito
        const token = data.token;

        setRol(data.rol);

        Cookies.set('token', token, { expires: 1 })
        handleCloseModal();
      })
      .catch(err => {
        console.log(err);
        alert("Ocurrió un error al registrar usuario", "error"); // Agrega una alerta de error
      });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Iniciar Sesión</button>
      {isOpen && (
        <div className="modal z-50" onClick={handleCloseModal}>
          <div className="bg-verde-500 flex flex-col items-center justify-center p-12 text-white gap-6 rounded-md shadow-md w-3/4" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <form className="text-verde-700 font-500 w-full flex flex-wrap gap-6 flex-col">
              <input className="bg-verde-100 px-4 py-2 shadow-md rounded-2xl" type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              <input className="bg-verde-100 px-4 py-2 shadow-md rounded-2xl" type="clave" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
              <button className="bg-verde-300 px-4 py-2 shadow-md rounded-2xl" type="button" onClick={handleLogin}>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
