export const fetchData = async(url, method, datos)=>{
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (datos) {
    options.body = JSON.stringify(datos);
  }

  const respuesta = await fetch(url, options);
  const jsonData = await respuesta.json();

  if(!respuesta.ok){
    throw new Error(jsonData.message || "Error de solicitud");
  }

  return jsonData
}