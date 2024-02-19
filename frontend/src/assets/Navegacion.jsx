import CerrarSesion from './CerrarSesion';
import Login from './ModalSesion';
import Modal from './modal';

const Navegacion = ({ API_USUARIO, estaLoggeado, addAlert }) => {
  return (
    <>
      <nav className='transition-all'>
        <ul className='flex flex-col gap-9 lg:flex-row lg:gap-3 text-verde-700'>
          <h1 className='mb-4 lg:mb-1 lg:hidden'>Licoreria 775rriente</h1>
          <a className='font-bold' href="#"><li>Inicio</li></a>
          {estaLoggeado == "Acceso autorizado" ? (
            <>
              <a className='font-bold' href="#"><li>Favoritos</li></a>
              <a className='font-bold' href="#"><li>Perfil</li></a>
              <CerrarSesion />
            </>
          ) : (
            <>
              <Login
                api={API_USUARIO}
              />
              <Modal
                api={API_USUARIO}
                addAlert={addAlert}
              />
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navegacion;