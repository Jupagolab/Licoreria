import React, { useState } from 'react';

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    // Por ejemplo, podrías enviar una solicitud al servidor para autenticar al usuario
    // Si la autenticación es exitosa, puedes cerrar el modal
    handleCloseModal();
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
              <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
