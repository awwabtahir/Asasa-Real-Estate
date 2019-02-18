import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/authentication.service';

declare var $:any;

@Component({
  selector: 'fav-heart',
  templateUrl: './fav-heart.component.html',
  styleUrls: ['./fav-heart.component.css']
})
export class FavHeartComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  fav = false;
  favClicked() {
    if(!this.auth.isLoggedIn())
      $('#signinModel').modal('show');
    else
      this.fav = !this.fav;
  }

}
