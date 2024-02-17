import { useState, useEffect } from 'react';

function AuthChecker() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una cookie de autenticación
    const token = getCookie('token');

    // Si hay una cookie, el usuario está autenticado
    if (token) {
      setIsLoggedIn(true);
    } else {
      // Si no hay una cookie, el usuario no está autenticado
      setIsLoggedIn(false);
    }
  }, []);

  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return isLoggedIn ? (
    <div>
      <p>Sesión iniciada</p>
      {/* Aquí puedes poner el contenido que deseas mostrar a los usuarios autenticados */}
    </div>
  ) : (
    <div>
      <p>No hay sesión iniciada</p>
      {/* Aquí puedes poner el contenido que deseas mostrar a los usuarios no autenticados */}
    </div>
  );
}

export default AuthChecker;

