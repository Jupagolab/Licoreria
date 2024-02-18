import Cookies from 'js-cookie';

const CerrarSesion = () => {
  const manejarCerrarSesion = () => {
    Cookies.remove('token');
    window.location.href = '/';
  };
  
  return (
    <>
      <button className='bg-verde-300 text-verde-700 rounded-lg px-3 py-1 lg:px-6 lg:py-3 border border-solid' onClick={manejarCerrarSesion}>Cerrar Sesión</button>
    </>
  );
};

export default CerrarSesion;