import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class RegistroEstudianteService {

  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/auth/signup';

  constructor() { }

  registro(user: Estudiante) : Promise<any> {

    return lastValueFrom (this.httpClient.post<any>(this.baseUrl, user));
      }
  }

