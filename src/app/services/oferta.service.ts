import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../interfaces/oferta';
import { OfertaDetalle } from '../interfaces/oferta-detalle';
import { IFavoritosCambiar } from '../interfaces/ifavoritos-cambiar';
import { IanadirOferta } from '../interfaces/ianadir-oferta';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';

  constructor() {}

  anadirOferta(oferta: IanadirOferta): Observable<IanadirOferta> {
    return this.httpClient.post<IanadirOferta>(this.baseUrl + '/empresa/ofertas/', oferta)
  }

  editarOferta(id: number, oferta: IanadirOferta): Observable<IanadirOferta> {
    // ← URL corregida
    return this.httpClient.put<IanadirOferta>(
      `${this.baseUrl}/empresa/ofertas/${id}`,
      oferta
    );
  }

  getOfertaParaEditar(id: number): Observable<IanadirOferta> {
    // ← también corregido
    return this.httpClient.get<IanadirOferta>(
      `${this.baseUrl}/empresa/ofertas/${id}`
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



  

  getMiofertas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(
      this.baseUrl + '/empresa/ofertas/'
    );
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
