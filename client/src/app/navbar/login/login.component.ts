import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import {TokenPayload} from 'shared/models/token';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe((data) => {
      this.saveData(data);
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.error(err);
    }); 
  }

  saveData(data) {
    data = data.data;
    localStorage.setItem('user', JSON.stringify(data));
    // console.log(JSON.parse(localStorage.getItem('user')));
  }
}
