import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/usuario/home/all';

  constructor() { }

  getAllEmpresas(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(this.baseUrl);
  }
  getEmpresaById(_id: string): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.baseUrl+"/"+_id);
  }
}
