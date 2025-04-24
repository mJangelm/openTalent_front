import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {


  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/usuario/proyectos/';

  constructor() { }

  getAllProyectos(): Observable<Proyecto[]>{
    console.log('haciendo la petición del getall')
    return this.httpClient.get<Proyecto[]>(this.baseUrl);
  }
  getById(_id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.baseUrl+"/"+_id);
  }
}
