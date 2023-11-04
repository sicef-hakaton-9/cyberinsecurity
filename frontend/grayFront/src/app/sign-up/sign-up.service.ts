import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt, SignupDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  signUp(signUpDTO: SignupDTO) {
    return  this.http.post<Jwt>('http://localhost:3000/auth/register', signUpDTO);
  }
}
