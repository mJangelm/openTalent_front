import { HttpInterceptorFn } from '@angular/common/http';


//El interceptor es un tipo de función que se puede usar en cualquier sitio.
//Para usarlo bien, tenemos que ir al app config.ts y añadirlo dentro del providehttpClient.

//En este caso, cuando hacemos la petición de login, va a pasar automáticamente por aquí, como
//podemos comprobar si hacemos F12 en el navegador mediante el console log escrito más abajo.

//Vemos que la función tiene un "req" que es la petición, y el next es para pasar al siguiente paso.

//Creamos una constante llamada cloneRequest para hacer una copia de la petición que nos llega.

//Dentro, vamos a configurar la cabecera (setHeaders), le vamos a decir que lo vamos a formatear
//en tipo Json y posteriormente le pasamos el accessToken o bien un vacío.
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("Paso por el linterceptor");

  const cloneRequest = req.clone({
    setHeaders: {
      'Content-type': 'aplication/json',
      'Authorization': localStorage.getItem("accessToken") || "null"
    }
  });

//Para que podamos pasar el token por la petición, tenemos que introducir el siguiente código.
//el "auth" hace referencia a la privateUrl, que tiene un /auth/. Si  la petición ya tiene un auth,
// no vamos a configurar la cabecera, en caso contrario, sí.

  if (cloneRequest.url.includes("auth")) {
    return next(req);
  } else {
    return next(cloneRequest);
  }
};
