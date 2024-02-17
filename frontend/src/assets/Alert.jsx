import React, { useState, useEffect } from 'react';
import './Modal.css'; // Importa los estilos CSS de la alerta

const Alert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Cierra la alerta después de cierto tiempo
    }, 3000); // Cambia el tiempo de visualización aquí (en milisegundos)

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className={`alert ${type}`}>
      <span className="close" onClick={onClose}>&times;</span>
      {message}
    </div>
  ) : null;
};

export default Alert;


