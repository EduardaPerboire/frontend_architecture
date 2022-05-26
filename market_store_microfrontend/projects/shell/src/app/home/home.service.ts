import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly URL = 'http://localhost:3500'

  constructor(private http: HttpClient) { }

  allproducts() {
    return this.http.get(this.URL + '/products');
  }
}
