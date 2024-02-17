import React, { useState } from 'react';
import './App.css';
import Modal from './assets/modal';
import Lista from './assets/Lista';

function App() {
  const API_INVENTARIO = 'http://localhost:4000/inventario/';
  const API_USUARIO = 'http://localhost:4000/usuarios/';
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type) => {
    const newAlert = { message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => removeAlert(newAlert), 3000);
  };

  const removeAlert = (alertToRemove) => {
    setAlerts(alerts.filter(alert => alert !== alertToRemove));
  };

  return (
    <>
      <header className="flex flex-wrap p-4 sm:p-6 lg:p-10 xl:p-8  items-center justify-between bg-verde-700 w-full">
        <h1>Licoreria 77SinCorriente</h1>
        <nav>
          <ul className='flex justify-between gap-12'>
            <a href=""><li>Inicio</li></a>
            <a href=""><li>Favoritos</li></a>
            <a href=""><li>Perfil</li></a>            
          </ul>
        </nav>
        <button className='bg-verde-300 text-verde-700 rounded-lg px-3 py-1 lg:px-6 lg:py-3 border border-solid'>Cerrar Sesión</button>
      </header>
      <main className="flex flex-wrap text-center p-4 bg-verde-500 min-h-4/5">
        <h2>Bienvenidos</h2>
        <Lista 
          api={API_INVENTARIO}
        />
        <Modal
          api={API_USUARIO}
          addAlert={addAlert}
        />
      </main>
      {/* Renderiza las alertas */}
      <div className="alerts">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert ${alert.type}`}>
            {alert.message}
            <button onClick={() => removeAlert(alert)}>Cerrar</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

