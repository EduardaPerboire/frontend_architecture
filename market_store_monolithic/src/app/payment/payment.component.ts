import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from './payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  hide = true;
  submittedPayment = false;
  paymentForm = this.fBuilder.group({
    number: [null, [Validators.required]],
    validity: [null, [Validators.required]],
    CVV: [null, [Validators.required]],
    cardholderName: [null, [Validators.required]],
    cpfCnpj: [null, [Validators.required]],
    cardNickname: [null],
  });

  constructor(private fBuilder: FormBuilder, 
              private router: Router,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  hasErrorPaymentForm(field: string) {
    return this.paymentForm.get(field)?.errors;
  }

  createPayment() {
    if (this.paymentForm.valid) {
      const payment = this.paymentForm.value
      this.paymentService.createPayment(payment).subscribe(data => {
        if (Object.keys(data).length) {
          this.router.navigate(['/dashboard']);
        } else {
          console.log('no')
        }
      });
    }
  }

}
