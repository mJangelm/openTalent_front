import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../interfaces/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {


  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/usuario/ofertas';

  constructor() { }

  getAllOfertas(): Observable<Oferta[]>{
    console.log('haciendo la petición del getall')
    return this.httpClient.get<Oferta[]>(this.baseUrl);
  }
}
