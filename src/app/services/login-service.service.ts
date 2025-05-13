import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { lastValueFrom, Observable } from 'rxjs';
import { EmpresaRegistroDto } from '../interfaces/empresa-registro-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'https://opentalentapi.matabuena.com/auth/';

  constructor() {}

  login(user: Iuser): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(this.baseUrl + 'login', user)
    );
  }

  registroEmpresa(user: EmpresaRegistroDto): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'registro/empresa', user);
  }
}
