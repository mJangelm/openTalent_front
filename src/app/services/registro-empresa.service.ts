import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { EmpresaRegistroDto } from '../interfaces/empresa-registro-dto';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {



  
  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/auth/registro/empresa';

  constructor() { }

  registro(userEmpresa: EmpresaRegistroDto) : Promise<any> {

    return lastValueFrom (this.httpClient.post<any>(this.baseUrl, userEmpresa));
      }
}
