import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../interfaces/oferta';

@Injectable({
  providedIn: 'root'
})
export class DetallesOfertaService {



  
  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/usuario/ofertas';

  constructor() { }

  



  getById(_id: number): Observable<Oferta> {
    return this.httpClient.get<Oferta>(this.baseUrl+"/"+_id);
  }
}
