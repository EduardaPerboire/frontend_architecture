import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any;
  products: any;
  notifier: NotifierService
  constructor(private router: Router, 
              private productsService: DashboardService,
              notifierService: NotifierService) { 
                this.notifier = notifierService;
              }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      console.log('this.username:', this.username)
    }
    this.productsService.allproducts().subscribe(data => {
      if (Object.keys(data).length) {
        console.log(data)
        this.products = data;
      } else {
        console.log('no')
      }
    });
  }

  add(productId: any) {
    if (this.username) {
      this.notifier.notify('success', 'Item adicionado à sua sacola!');
    } else {
      this.notifier.notify('warning', 'É preciso estar logado!');
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('username');
    this.username = null;
  }

  applyStyles() {
    return this.username != null ? '69%': '72%'
  }

}
