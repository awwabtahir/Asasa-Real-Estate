import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { UserDetails } from 'shared/models/UserDetails';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
}
