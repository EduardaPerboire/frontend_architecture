import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  submittedUser = false;
  userForm = this.fBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(private fBuilder: FormBuilder, 
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  hasErrorUserForm(field: string) {
    return this.userForm.get(field)?.errors;
  }

  createPayment() {
    if (this.userForm.valid) {
      const user = this.userForm.value
      this.userService.createUser(user).subscribe(data => {
        if (Object.keys(data).length) {
          this.router.navigate(['/home']);
        } else {
          console.log('no')
        }
      });
    }
  }

}

