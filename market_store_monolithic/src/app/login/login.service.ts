import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
     return this.http.get(this.URL + '/users?' + `email=${email}` + '&' + `password=${password}`);
  }
}
