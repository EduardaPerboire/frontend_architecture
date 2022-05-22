import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly URL = 'http://localhost:3000/payment'

  constructor(private http: HttpClient) { }

  createPayment(payment: any) {
    return this.http.post(this.URL, payment);
 }

}
