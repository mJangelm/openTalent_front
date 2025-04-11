import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Iuser } from '../../models/interfaces/iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base de la API del backend. Cambia este valor según tu configuración.
  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Método para realizar el login.
   * Envía email y password al endpoint de login y, si la respuesta es correcta,
   * guarda el email en localStorage para identificar al usuario.
   */
  
  login(email: string, password: string): Observable<any> {
    const endpoint = (`${this.baseUrl}/login`);
    const body = { email, password };
    return this.http.post(endpoint, body)
      .pipe(
        tap((response: any) => {
          if (response && response.email) {
            localStorage.setItem('userEmail', response.email);
          }
        }),
        catchError(error => {
          console.error('Error en el login:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Método para registrar un nuevo usuario.
   * Envía los datos del usuario al endpoint de registro y, en caso de éxito,
   * almacena el email en el localStorage.
   */
  register(usuario: Iuser): Observable<any> {
    const endpoint = (`${this.baseUrl}/register`);
    return this.http.post(endpoint, usuario)
      .pipe(
        tap((response: any) => {
          // Si la respuesta contiene el email, se almacena en el localStorage
          if (response && response.email) {
            localStorage.setItem('userEmail', response.email);
            console.log('Registro exitoso');
          }
        }),
        catchError(error => {
          // Manejo básico del error: se imprime en consola y se propaga
          console.error('Error en el registro:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Método para cerrar la sesión del usuario.
   * Simplemente se elimina el email del localStorage.
   */
  logout(): void {
    localStorage.removeItem('userEmail');
  }

  /**
   * Comprueba si el usuario está logueado.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('userEmail') !== null;
  }
}