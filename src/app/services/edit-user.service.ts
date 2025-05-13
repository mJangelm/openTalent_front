import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmpresaRegistroDto } from '../interfaces/empresa-registro-dto';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';
import { RegistroEstudianteDto } from '../interfaces/registro-estudiante-dto';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'https://opentalentapi.matabuena.com';
  constructor() {}

  //editar este de abajo!!

  editarPerfilEstudiante(
    user: RegistroEstudianteDto
  ): Observable<RegistroEstudianteDto> {
    return this.httpClient.put<RegistroEstudianteDto>(
      this.baseUrl + '/usuario/editar',
      user
    );
  }

  editarPerfilEmpresaUser(
    user: EmpresaRegistroDto
  ): Observable<EmpresaRegistroDto> {
    return this.httpClient.put<EmpresaRegistroDto>(
      this.baseUrl + '/empresa/',
      user
    );
  }
}
