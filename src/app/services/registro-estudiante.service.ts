import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../interfaces/estudiante';
import { RegistroEstudianteDto } from '../interfaces/registro-estudiante-dto';

@Injectable({
  providedIn: 'root'
})
export class RegistroEstudianteService {

  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/auth/signup';

  constructor() { }

  registro(user: RegistroEstudianteDto) : Observable<any> {

    return this.httpClient.post<any>(this.baseUrl, user);
      }


  }

