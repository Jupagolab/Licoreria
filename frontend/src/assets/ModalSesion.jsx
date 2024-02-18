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
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <form>
              <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
              <input type="clave" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
              <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
