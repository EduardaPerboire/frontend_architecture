import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(this.URL, user);
 }
}
