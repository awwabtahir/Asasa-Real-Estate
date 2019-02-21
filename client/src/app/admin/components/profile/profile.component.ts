import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { UserDetails } from 'shared/models/UserDetails';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  edit = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  editClicked(){
    this.edit = true;
  }

  updateClicked() {
    let user = this.details;
    this.auth.updateUser(user).subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    this.edit = false;
  }
}
