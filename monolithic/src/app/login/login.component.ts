import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  submittedUser = false;
  userForm = this.fBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  constructor(private fBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

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
          this.router.navigate(['/dashboard']);
        } else {
          console.log('no')
        }
      });
    }
  }

}
