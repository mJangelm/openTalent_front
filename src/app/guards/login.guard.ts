import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accessToken = localStorage.getItem("accessToken");
  const rolUsuario = localStorage.getItem("rol");
  const expectedRoles: string[] = route.data?.['roles'] || [];

  if (!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRoles.length > 0 && !expectedRoles.includes(rolUsuario || '')) {
    router.navigate(['/login']); // Puedes crear este componente si quieres
    alert('no se ha podido acceder')
    return false;
  }

  return true;
};
