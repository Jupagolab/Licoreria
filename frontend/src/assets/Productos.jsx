import { useState, useRef, useEffect } from 'react';
import { fetchData } from './Inventario';

const ModalProductos = ({ abierto, cerrar, api, ProductoSeleccionado, addAlert }) => {
  const modalRef = useRef(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    marca: "",
    tipo: "",
    volumen: 0,
    cantidad: 0,
    precio: 0,
    imagen: "",
  });

  useEffect(() => {
    setNuevoProducto({
      nombre: ProductoSeleccionado?.nombre || "",
      marca: ProductoSeleccionado?.marca || "",
      tipo: ProductoSeleccionado?.tipo || "",
      volumen: ProductoSeleccionado?.volumen || 0,
      cantidad: ProductoSeleccionado?.cantidad || 0,
      precio: ProductoSeleccionado?.precio || 0,
      imagen: ProductoSeleccionado?.imagen || "",
    });
  }, [ProductoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleAgregar = () => {
    const agregarProductos = async (nuevoProducto) => {
      const respuesta = await fetchData(api, 'POST', nuevoProducto);
      addAlert(respuesta.mensaje);
    };

    agregarProductos(nuevoProducto);

    setNuevoProducto({
      nombre: "",
      marca: "",
      tipo: "",
      volumen: 0,
      cantidad: 0,
      precio: 0,
      imagen: "",
    });
    cerrar();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      cerrar();
    }
  };

  useEffect(() => {
    if (abierto) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [abierto]);

  return (
    <>
      {abierto && (
        <div className="fixed inset-0 z-50 bg-verde-700 bg-opacity-75 flex items-center justify-center">
          <div ref={modalRef} className="bg-verde-700 rounded-md shadow-lg p-5">
            {/* Contenido del modal */}
            <h2 className="text-white mb-4">Agregar Producto</h2>
            <div className="flex flex-col text-left gap-3">
              <input
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="text"
                name="marca"
                value={nuevoProducto.marca}
                onChange={handleChange}
                placeholder="Marca"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="text"
                name="tipo"
                value={nuevoProducto.tipo}
                onChange={handleChange}
                placeholder="Tipo"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="number"
                name="volumen"
                value={nuevoProducto.volumen}
                onChange={handleChange}
                placeholder="Volumen"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="number"
                name="cantidad"
                value={nuevoProducto.cantidad}
                onChange={handleChange}
                placeholder="Cantidad"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
                placeholder="Precio"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
              <input
                type="url"
                name="imagen"
                value={nuevoProducto.imagen}
                onChange={handleChange}
                placeholder="URL de la Imagen"
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-white text-verde-700 px-4 py-2 rounded-lg mr-3"
                onClick={handleAgregar}
              >
                Agregar
              </button>
              <button
                className="bg-white text-verde-700 px-4 py-2 rounded-lg"
                onClick={cerrar}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProductos;


