import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Paso por el interceptor");

  if (req.url.includes("/auth/signup")) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    return next(clonedRequest);
  }

  const token = localStorage.getItem("accessToken");

  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });

  console.log("Request clonado con token:", clonedRequest);

  return next(clonedRequest);
};
