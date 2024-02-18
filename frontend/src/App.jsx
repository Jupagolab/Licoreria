import { useState, useEffect } from 'react';
import './App.css';
import Lista from './assets/Lista';
import AuthChecker from './assets/Verificacion';
import MenuToggle from './assets/MenuToggle';

function App() {
  const API_INVENTARIO = 'http://localhost:4000/inventario/';
  const API_USUARIO = 'http://localhost:4000/usuarios/';
  const [alerts, setAlerts] = useState([]);
  const [estaLoggeado, setEstaLoggeado] = useState("");

  const addAlert = (message, type) => {
    const newAlert = { message, type };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => removeAlert(newAlert), 3000);
  };

  const removeAlert = (alertToRemove) => {
    setAlerts(alerts.filter(alert => alert !== alertToRemove));
  };

  useEffect(() => {
    const comprobarSesion = async () => {
      const resultado = await AuthChecker();
      console.log(resultado)
      setEstaLoggeado(resultado);
    }
    comprobarSesion();
  }, []);

  return (
    <>
      <header className="flex flex-wrap p-4 sm:p-6 lg:p-10 xl:p-8 items-center justify-center lg:justify-between bg-verde-700 w-full">
        <div className="flex flex-row-reverse items-center gap-9 lg:flex-row">
          <h1>Licoreria 775rriente</h1>
          <MenuToggle
            API_USUARIO={API_USUARIO}
            estaLoggeado={estaLoggeado}
            addAlert={addAlert}
          />
        </div>
      </header>
      <main className="flex flex-wrap text-center p-4 bg-verde-500 min-h-4/5">
        <h2>Bienvenidos</h2>
        <Lista
          api={API_INVENTARIO}
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

