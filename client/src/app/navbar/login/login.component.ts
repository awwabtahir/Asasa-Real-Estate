import { Component } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: "signin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  credentials = {
    email: "",
    password: ""
  };

  regForm = false;
  name = "";
  phone = "";
  repassword = "";

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      data => {
        this.saveData(data);
      },
      err => {
        console.error(err);
      }
    );
  }

  invalid = false;
  registerCustomer() {
    this.credentials["name"] = this.name;
    this.credentials["phone"] = this.phone;
    this.credentials["access"] = "customer";

    if (
      this.credentials.email == "" ||
      this.credentials.password == "" ||
      this.credentials["name"] == "" ||
      this.credentials["phone"] == ""
    ) {
      this.invalid = true;
    } else {
      $("#signinModel").modal("hide");
      this.auth.register(this.credentials).subscribe(
        () => {
          console.log("registered");
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  saveData(data) {
    data = data.data;
    localStorage.setItem("user", JSON.stringify(data));
    // console.log(JSON.parse(localStorage.getItem('user')));
  }

  reg() {
    this.regForm = !this.regForm;
  }
}
