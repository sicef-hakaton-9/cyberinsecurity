import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt, LoginDTO, User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) : Observable<Jwt> {
    return this.http.post<Jwt>('http://localhost:3000/auth/login', loginDTO);
  }


}
