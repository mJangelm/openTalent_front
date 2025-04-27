import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { IEmpresaDetalle } from '../interfaces/iempresa-detalle';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';

  constructor() {}

  getAllEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.baseUrl + '/usuario/home');
  }
  getEmpresaById(cif: string): Observable<IEmpresaDetalle> {
    return this.httpClient.get<IEmpresaDetalle>(
      this.baseUrl + '/usuario/empresas/' + cif
    );
  }
}
