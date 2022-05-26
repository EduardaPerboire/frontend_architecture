import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  notifier: NotifierService
  hide = true;
  submittedUser = false;
  userForm = this.fBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  constructor(private fBuilder: FormBuilder, 
              private router: Router, 
              private loginService: LoginService,
              notifierService: NotifierService) { 
                this.notifier = notifierService;
              }

  ngOnInit(): void {
  }

  hasErrorUserForm(field: string) {
    return this.userForm.get(field)?.errors;
  }

  login() {
    if (this.userForm.valid) {
      const user = this.userForm.value
      this.loginService.login(user.email, user.password).subscribe(data => {
        if (Object.keys(data).length) {
          console.log(Object.values(data)[0].name)
          localStorage.setItem('username', Object.values(data)[0].name)
          this.router.navigate(['/home']);
        } else {
          console.log('user error')
          this.notifier.notify('error', 'Usuário e/ou Senha inválidos!');
        }
      });
    }
  }

}
