import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmpresaRegistroDto } from '../interfaces/empresa-registro-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';
  constructor() { }

  editarPerfilEmpresaUser(user: EmpresaRegistroDto): Observable<EmpresaRegistroDto> {
    return this.httpClient.put<EmpresaRegistroDto>(this.baseUrl + '/empresa/', user)
  }
}
