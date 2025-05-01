import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { ProyectosView } from '../interfaces/proyectos-view';
import { IFavoritosCambiar } from '../interfaces/ifavoritos-cambiar';
import { ProyectoRequestI } from '../interfaces/proyecto-request-i';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009/';

  constructor() {}

  anadirNuevoProyecto(proyectoNew: ProyectoRequestI): Observable<ProyectoRequestI> {
    return this.httpClient.post<ProyectoRequestI>(this.baseUrl +'usuario/proyectos/annadirproyecto' ,proyectoNew)
  }

 editarProyecto(proyectoEdit: ProyectoRequestI): Observable<ProyectoRequestI> {
    return this.httpClient.put<ProyectoRequestI>(this.baseUrl +'usuario/proyectos/' ,proyectoEdit)
  }
 

  getAllProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.baseUrl + 'usuario/proyectos/');
  }
  getById(_id: number): Observable<ProyectosView> {
    return this.httpClient.get<ProyectosView>(
      this.baseUrl + 'usuario/proyectos/' + _id
    );
  }
  cambiarEstadoFavorito(estado: IFavoritosCambiar): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'usuario/proyectos/favoritos/cambiar',
      estado
    );
  }

  getFavoritos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(
      this.baseUrl + 'usuario/proyectos/favoritos'
    );
  }

  getMisProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(
      this.baseUrl + 'usuario/proyectos/mis-proyectos'
    );
  }
}
