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

        this.registerCustomer(userData);

        // if(!this.registered(userData)) this.registerCustomer(userData);
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
