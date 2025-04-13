import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Paso por el interceptor");

  // Si la URL es para signup (o cualquier endpoint de auth), enviamos Content-Type y omitimos Authorization
  if (req.url.includes("/auth/signup")) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    return next(clonedRequest);
  }

  // Para otros endpoints, se añade el token y el Content-Type
  const token = localStorage.getItem("accessToken");
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',  // Corregido el typo
      'Authorization': token ? token : "null"
    }
  });

  return next(clonedRequest);
};

