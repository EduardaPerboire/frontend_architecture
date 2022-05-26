import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

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
              private cardService: CardService) { }

  ngOnInit(): void {
  }

  hasErrorPaymentForm(field: string) {
    return this.paymentForm.get(field)?.errors;
  }

  createPayment() {
    if (this.paymentForm.valid) {
      const payment = this.paymentForm.value
      this.cardService.createPayment(payment).subscribe(data => {
        if (Object.keys(data).length) {
          this.router.navigate(['/home']);
        } else {
          console.log('no')
        }
      });
    }
  }

}
