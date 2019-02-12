import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/authentication.service';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() id;

  name = "";
  email = "";
  phone = "";
  type = "";
  optin = true;
  
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  send() {
    if(this.email == "" || this.phone == "") return;

    let message = "<p>Name: "+ this.name +"</p><p>Type: "+ this.type +"</p><p>Email: "+ this.email +"</p><p>Phone: "+ this.phone +"</p><p>Message: "+ $("#message").text() + "</p>";
    let email = {
      email: this.email,
      message: message
    };

    this.auth.sendEmail(email).subscribe(() => {
      console.log("email processed");
    }, (err) => {
      console.error(err);
    });
  }

}
