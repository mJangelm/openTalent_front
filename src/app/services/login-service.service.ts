import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  httpClient = inject(HttpClient);

  private baseUrl : string = 'http://localhost:9009/auth/';

  constructor() { }

  login(user: Iuser) : Promise<any> {

    return lastValueFrom (this.httpClient.post<any>(this.baseUrl+"login", user));
      }
  }
  

