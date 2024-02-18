import Cookie from 'js-cookie';

async function AuthChecker() {
  const API = 'http://localhost:4000/usuarios/login'

  const token = Cookie.get("token");

  if (token) {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    }

    await fetch(API, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.mensaje);
        return { status: data.mensaje };
      })
      .catch(err => {
        throw new Error(`Acceso no autorizado ${err}`)
      })

  } else {
    return "Sesion no iniciada";
  }
}

export default AuthChecker;
