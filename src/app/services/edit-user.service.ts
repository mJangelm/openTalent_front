import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmpresaRegistroDto } from '../interfaces/empresa-registro-dto';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9009';
  constructor() { }

  //editar este de abajo!!

  editarPerfilEstudiante(user : Estudiante): Observable<Estudiante> {
    return this.httpClient.put<Estudiante>(this.baseUrl + '/user', user)
  }

  editarPerfilEmpresaUser(user: EmpresaRegistroDto): Observable<EmpresaRegistroDto> {
    return this.httpClient.put<EmpresaRegistroDto>(this.baseUrl + '/empresa/', user)
  }
}
