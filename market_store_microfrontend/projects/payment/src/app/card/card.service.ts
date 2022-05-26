import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly URL = 'http://localhost:3500/payment'

  constructor(private http: HttpClient) { }

  createPayment(payment: any) {
    return this.http.post(this.URL, payment);
 }
}
