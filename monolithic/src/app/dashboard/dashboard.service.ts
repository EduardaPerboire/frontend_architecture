import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  allproducts() {
    return this.http.get(this.URL + '/products');
 }
}
