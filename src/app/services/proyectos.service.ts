import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { ProyectosView } from '../interfaces/proyectos-view';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009/';

  constructor() {}

  getAllProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.baseUrl + 'usuario/proyectos/');
  }
  getById(_id: number): Observable<ProyectosView> {
    return this.httpClient.get<ProyectosView>(
      this.baseUrl + 'usuario/proyectos/' + _id
    );
  }
}
