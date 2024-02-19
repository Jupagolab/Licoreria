import { useEffect, useState } from "react";
import { fetchData } from './Inventario';

const ModalProductos = ({ abierto, cerrar, api, ProductoSeleccionado }) => {

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    marca: "",
    tipo: "",
    volumen: 0,
    cantidad: 0,
    precio: 0,
    imagen: "",
  });
  /*
  //Cuando se edite el Producto del inventario que lo muestre en los campos
  useEffect(() => {
    if (ProductoSeleccionado !== camposVacios) {
      setNuevoProducto(ProductoSeleccionado);
    }
  }, [ProductoSeleccionado])

  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleAgregar = () => {
    const agregarProductos = async (nuevoProducto) => {
      const respuesta = await fetchData(api, 'POST', nuevoProducto)
      return respuesta;
    }

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

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-verde-700 bg-opacity-75 ${abierto ? 'transition-all' : 'hidden'}`}>
        <div className="flex items-center justify-center h-3/5">
          <div className='bg-verde-700 rounded-md grid grid-cols-1 shadow'>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Nombre</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="text"
                name="nombre"
                id="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Marca</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="text"
                name="marca"
                id="marca"
                value={nuevoProducto.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Tipo</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="text"
                name="tipo"
                id="tipo"
                value={nuevoProducto.tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Volumen</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="number"
                name="volumen"
                id="volumen"
                value={nuevoProducto.volumen}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Cantidad</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="number"
                name="cantidad"
                id="cantidad"
                value={nuevoProducto.cantidad}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-left p-3 gap-2.5">
              <h4 className="ml-2.5">Precio</h4>
              <input
                className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                type="text"
                name="precio"
                id="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
              <div className="flex flex-col text-left p-3 gap-2.5">
                <h4 className="ml-2.5">Imagen</h4>
                <input
                  className="bg-verde-400 rounded-sm border-2 border-verde-600 px-2.5 py-1"
                  type="url"
                  name="Imagen"
                  id="Imagen"
                  value={nuevoProducto.Imagen}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center m-auto text-center p-3">
              <img className="w-10 md:w-12 lg:w-14 xl:w-14 cursor-pointer" src="/check-circle.png" alt="Agregar" onClick={handleAgregar} />
              <img className="w-10 md:w-12 lg:w-14 xl:w-14 cursor-pointer" src="/x-circle.png" alt="Cerrar" onClick={cerrar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ModalProductos;


