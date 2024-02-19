import { useState, useEffect } from 'react';
import Navegacion from './Navegacion.jsx';

const MenuToggle = ({ API_USUARIO, estaLoggeado, addAlert }) => {
  const [abierto, setAbierto] = useState(false);

  const menu = () => {
    setAbierto(!abierto);
  }

  return (
    <div className="relative menu-container">
      <div className="lg:hidden">
        <button className="bg-verde-400 rounded-md text-2x1 text-verde-700 relative z-40 p-2" onClick={menu}>
          {abierto ? 'X' : 
          <div className="flex flex-col gap-1">
            <span className="block w-7 rounded h-0.5 border border-solid bg-white"></span>
            <span className="block w-7 rounded h-0.5 border border-solid bg-white"></span>
            <span className="block w-7 rounded h-0.5 border border-solid bg-white"></span>
          </div>
          }
        </button>
      </div>

      <div className='hidden lg:flex justify-between gap-12'>
        <Navegacion
          API_USUARIO={API_USUARIO}
          estaLoggeado={estaLoggeado}
          addAlert={addAlert}
        />
      </div>
      {abierto && (
        <div className="lg:hidden py-24 px-12 fixed shadow z-30 top-0 left-0 w-4/5 h-full bg-verde-300 flex">
          <Navegacion
            API_USUARIO={API_USUARIO}
            estaLoggeado={estaLoggeado}
            addAlert={addAlert}
          />
        </div>
      )}
    </div>
  );
}

export default MenuToggle;