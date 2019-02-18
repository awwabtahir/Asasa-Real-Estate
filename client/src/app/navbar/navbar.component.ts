import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  customer = false;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.access == "customer") this.customer = true;
  }

}
