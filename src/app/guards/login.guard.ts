import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  let isAuth: boolean = false;
  const router = inject(Router);
  
  //Para darle acceso a determinadas rutas (o no), verificaremos si estamos logeados o no a través
  //del token almacenado en el Local Storage. Si hay token almacenado, cambiamos el boolean a verdadero.
  //De lo contrario, la web interpretará que no estamos logeados, y por tanto nos devolverá a la
  //vista de login.
  
  if (localStorage.getItem("accessToken")) {
    isAuth = true;
  } else {
    router.navigate(['/login']);
  }
    return isAuth;
};
