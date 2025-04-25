import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../interfaces/oferta';
import { OfertaDetalle } from '../interfaces/oferta-detalle';
import { IFavoritosCambiar } from '../interfaces/ifavoritos-cambiar';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';

  constructor() {}

  getAllOfertas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(this.baseUrl + '/usuario/ofertas/');
  }

  getById(_id: number): Observable<OfertaDetalle> {
    return this.httpClient.get<OfertaDetalle>(
      this.baseUrl + '/usuario/ofertas/' + _id
    );
  }

  getAllOfertasFavoritas(): Observable<Oferta[]> {
    return this.httpClient.get<Oferta[]>(this.baseUrl + '/usuario/ofertas/favoritas');
  }

  cambiarEstadoFavorito(estado: IFavoritosCambiar): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + '/usuario/ofertas/favoritas/cambiar',
      estado
    );
  }
}
