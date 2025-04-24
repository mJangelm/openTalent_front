import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/signup')) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return next(clonedRequest);
  }

  const token = localStorage.getItem('accessToken');

  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(clonedRequest);
};
