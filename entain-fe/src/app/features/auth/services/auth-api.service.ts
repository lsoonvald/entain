import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IAuthRequest, IAuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient
  ) {}

  logIn(credentials: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${environment.baseUrl}/auth/login`, credentials);
  }
}
