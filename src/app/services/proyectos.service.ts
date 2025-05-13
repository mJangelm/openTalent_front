import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { ProyectosView } from '../interfaces/proyectos-view';
import { IFavoritosCambiar } from '../interfaces/ifavoritos-cambiar';
import { ProyectoRequestI } from '../interfaces/proyecto-request-i';
import { PostulanteI } from '../interfaces/postulante';
import { IEstadoSolicitud } from '../interfaces/iestado-solicitud';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'https://opentalentapi.matabuena.com/';

  constructor() {}

  anadirNuevoProyecto(
    proyectoNew: ProyectoRequestI
  ): Observable<ProyectoRequestI> {
    return this.httpClient.post<ProyectoRequestI>(
      this.baseUrl + 'usuario/proyectos/annadirproyecto',
      proyectoNew
    );
  }

  cancelarProyecto(idProyecto: number): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}usuario/proyectos/${idProyecto}/cancelar`,
      {} // body vacío
    );
  }

  editarProyecto(proyectoEdit: ProyectoRequestI): Observable<ProyectoRequestI> {
    return this.httpClient.put<ProyectoRequestI>(
      this.baseUrl + 'usuario/proyectos/',
      proyectoEdit
    );
  }

  getAllProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.baseUrl + 'usuario/proyectos/');
  }
  getById(_id: number): Observable<ProyectosView> {
    return this.httpClient.get<ProyectosView>(
      this.baseUrl + 'usuario/proyectos/' + _id
    );
  }

  getProyectoAEditarById(_id: number): Observable<ProyectoRequestI> {
    return this.httpClient.get<ProyectoRequestI>(
      this.baseUrl + 'usuario/proyectos/detalles/editar/' + _id
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

  solicitarProyecto(idProyecto: number): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'usuario/proyectos/solicitar/' + idProyecto,
      {}
    );
  }

  verPostulantes(idProyecto: number): Observable<PostulanteI[]> {
    return this.httpClient.get<PostulanteI[]>(
      this.baseUrl + 'usuario/proyectos/' + idProyecto + '/postulantes'
    );
  }
  modificarEstadoPostulante(estado: IEstadoSolicitud): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'usuario/proyectos/responder-solicitud',
      estado
    );
  }
}
