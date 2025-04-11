import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { iEmpresa } from '../../models/interfaces/iEmpresa';
import { Iuser } from '../../models/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
// URL base de la API del backend. Ajusta este valor según tu configuración.
private baseUrl: string = 'http://localhost:3000/api';

private httpClient = inject(HttpClient);

constructor() { }

/**
 * Obtiene la lista de empresas desde el backend.
 * Se asume que el endpoint es `${baseUrl}/companies`.
 */
getEmpresas(): Observable<iEmpresa[]> {
  const endpoint = `${this.baseUrl}/companies`;
  return this.httpClient.get<iEmpresa[]>(endpoint)
    .pipe(
      tap(response => console.log('Empresas obtenidas:', response)),
      catchError(error => {
        console.error('Error al obtener empresas:', error);
        return throwError(() => error);
      })
    );
}

/**
 * Obtiene la lista de usuarios desde el backend.
 * Se asume que el endpoint es `${baseUrl}/users`.
 */
getUsers(): Observable<Iuser[]> {
  const endpoint = `${this.baseUrl}/users`;
  return this.httpClient.get<Iuser[]>(endpoint)
    .pipe(
      tap(response => console.log('Usuarios obtenidos:', response)),
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => error);
      })
    );
}

crearEmpresa(company: iEmpresa): Observable<iEmpresa> {
  const endpoint = `${this.baseUrl}/empresas`;
  return this.httpClient.post<iEmpresa>(endpoint, company)
    .pipe(
      tap(response => console.log('Empresa creada:', response)),
      catchError(error => {
        console.error('Error al crear empresa:', error);
        return throwError(() => error);
      })
    );
}

modificarEmpresa(empresaId: String | string, empresa: iEmpresa): Observable<iEmpresa> {
  const endpoint = `${this.baseUrl}/companies/${empresaId}`;
  return this.httpClient.put<iEmpresa>(endpoint, empresa)
    .pipe(
      tap(response => console.log('Empresa actualizada:', response)),
      catchError(error => {
        console.error('Error al actualizar empresa:', error);
        return throwError(() => error);
      })
    );
}
}
