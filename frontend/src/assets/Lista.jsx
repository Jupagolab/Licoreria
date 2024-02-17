import { useState, useEffect } from 'react';

const Lista = ({ api, addAlert }) => {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    const buscar = async () => {
      await fetch(api)
        .then(res => res.json())
        .then(data => {
          // Filtra productos con al menos una existencia en el inventario
          const productosFiltrados = data.filter(producto => producto.cantidad > 0);
          setInventario(productosFiltrados);
        })
        .catch(err => {
          console.log(err);
          addAlert("Error al cargar el inventario", "error"); // Agrega una alerta de error
        });
    };
    buscar();
  }, [api, addAlert]);

  return (
    <div className="grid grid-cols-1 items-center text-center gap-4">
      <div>
        <button className="bg-verde-300 rounded-2xl px-6 p-1.5">FILTRO</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {inventario.map((producto, index) => (
          <div key={index} className="flex text-left gap-5 p-3 font-Poppins rounded-lg bg-white text-black">
            <div className='w-20'>
              <img src={producto.imagen} alt="" />
            </div>
            <div className='flex flex-wrap flex-col w-full'>
              <h3 className='font-semibold text-base text-wrap'>{producto.marca} | {producto.nombre}</h3>
              <p className='font-extralight text-[0.7rem]'>{producto.volumen} ml</p>
              <p className='font-semibold text-right text-red-600 text-[0.55rem]'>{producto.cantidad} disponibles</p>
              <p className='text-verde-400 font-semibold text-lg'>$ {producto.precio}</p>
            </div>
            <div className='flex flex-col justify-between text-right'>
              <div>
                <a href="#">v3</a>
              </div>
              <div className='flex gap-3'>
                <a href="#">E</a>
                <img src="./componentes/iconos/heart.svg" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="bg-verde-300 rounded-2xl px-6 p-1.5">Agregar</button>
      </div>
    </div>
  )
}

export default Lista;
