import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: any;
  products: any;
  notifier: NotifierService

  constructor(private router: Router,
              private homeService: HomeService,
              notifierService: NotifierService) {
                this.notifier = notifierService;
               }

  ngOnInit(): void {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      console.log('this.username:', this.username)
    }
    this.homeService.allproducts().subscribe(data => {
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
    this.router.navigate(['/access/login']);
  }

  logout() {
    localStorage.removeItem('username');
    this.username = null;
  }

  applyStyles() {
    return this.username != null ? '75%': '80%'
  }

}
