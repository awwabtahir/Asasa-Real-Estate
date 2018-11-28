import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { AuthenticationService } from 'app/authentication.service';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  customers;

  constructor(
    private socialAuthService: AuthService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.getCustomers();
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        delete userData['token'];

        if(!this.registered(userData)) this.registerCustomer(userData);
        console.log("successfully logined");
        // this.loginCustomer(userData);            
      }
    );
  }

  getCustomers() {
    this.auth.getCustomers().subscribe(customers => {
      this.customers = customers;
    }, (err) => {
      console.error(err);
    });
  }

  private registered(user) {
    var i;
    for (i = 0; i < this.customers.length; i++) {
        if (this.customers[i].email === user.email) {
            return true;
        }
    }
    return false;
  }

  private registerCustomer(user) {
    this.auth.saveCustomer(user).subscribe(() => {
      console.log("success");
    }, (err) => {
      console.error(err);
    });
  }

  private loginCustomer(user) {

  }

}
