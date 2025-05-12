import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Oferta } from '../interfaces/oferta';
import { OfertaDetalle } from '../interfaces/oferta-detalle';
import { IFavoritosCambiar } from '../interfaces/ifavoritos-cambiar';
import { IanadirOferta } from '../interfaces/ianadir-oferta';
import { PostulanteI } from '../interfaces/postulante';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';

  constructor() {}

  aceptarPostulante(
    idOferta: number,
    idUsuario: number
  ): Observable<PostulanteI> {
    return this.httpClient.put<PostulanteI>(
      this.baseUrl +
        '/empresa/ofertas/' +
        idOferta +
        '/postulantes/' +
        idUsuario +
        '/aceptar',
      {}
    );
  }

  rechazarPostulante(
    idOferta: number,
    idUsuario: number
  ): Observable<PostulanteI> {
    return this.httpClient.put<PostulanteI>(
      this.baseUrl +
        '/empresa/ofertas/' +
        idOferta +
        '/postulantes/' +
        idUsuario +
        '/rechazar',
      {}
    );
  }

  anadirOferta(oferta: IanadirOferta): Observable<IanadirOferta> {
    return this.httpClient.post<IanadirOferta>(
      this.baseUrl + '/empresa/ofertas/',
      oferta
    );
  }

  cerrarOferta(id: number): Observable<Oferta> {
    const url = `${this.baseUrl}/empresa/ofertas/${id}/cerrar`;
    return this.httpClient.put<Oferta>(url, {}).pipe(
      tap({
        next: (oferta) => console.log('<< cerrarOferta() respuesta:', oferta),
        error: (err) => console.error('¡¡ cerrarOferta() error:', err),
      })
    );
  }
  editarOferta(id: number, oferta: IanadirOferta): Observable<string> {
    const url = `${this.baseUrl}/empresa/ofertas/${id}`;
    return this.httpClient.put(url, oferta, { responseType: 'text' });
  }

  getOfertaParaEditar(id: number): Observable<IanadirOferta> {
    // ← también corregido
    return this.httpClient.get<IanadirOferta>(
      `${this.baseUrl}/empresa/ofertas/${id}/editar`
    );
  }

  getMisOfertas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(this.baseUrl + '/empresa/ofertas/');
  }

  getAllOfertas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(this.baseUrl + '/usuario/ofertas/');
  }

  getById(_id: number): Observable<OfertaDetalle> {
    return this.httpClient.get<OfertaDetalle>(
      this.baseUrl + '/usuario/ofertas/' + _id
    );
  }

  getByIdparaEditar(_id: number): Observable<IanadirOferta> {
    return this.httpClient.get<IanadirOferta>(
      this.baseUrl + '/empresa/ofertas/' + _id
    );
  }

  getPostulantes(_id: number): Observable<PostulanteI[]> {
    return this.httpClient.get<PostulanteI[]>(
      this.baseUrl + '/empresa/ofertas/' + _id + '/postulantes'
    );
  }

  getMiofertas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(this.baseUrl + '/empresa/ofertas/');
  }

  getAllOfertasFavoritas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(
      this.baseUrl + '/usuario/ofertas/favoritas'
    );
  }

  cambiarEstadoFavorito(estado: IFavoritosCambiar): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + '/usuario/ofertas/favoritas/cambiar',
      estado
    );
  }

  inscribirseOferta(idOferta: number): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + '/usuario/ofertas/inscribir/' + idOferta,
      {}
    );
  }
}
