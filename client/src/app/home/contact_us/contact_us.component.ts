import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "shared/services/map.service";
import { AuthenticationService } from "app/authentication.service";
import { Router, NavigationEnd } from "@angular/router";
@Component({
  selector: "contactus",
  templateUrl: "./contact_us.component.html",
  styleUrls: ["./contact_us.component.css"]
})
export class ContactUsComponent implements OnInit {
  // labelOptions = {
  //   color: "black",
  //   fontFamily: "",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  //   text: "ASASA Real Estate"
  // };
  icon = {
    url: "assets/images/map_pin.png",
    scaledSize: {
      width: 180,
      height: 90
    }
  };
  title: string = "AGM project";
  latitude: number;
  longitude: number;
  latitude_ps: number;
  longitude_ps: number;
  zoom: number;
  @Input() id;

  name = "";
  email = "";
  phone = "";
  type = "";
  optin = true;
  subject = "";
  message = "";
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.setCurrentLocation();
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = 33.70357;
        this.longitude = 72.979746;
        this.latitude_ps = 34.00524509786271;
        this.longitude_ps = 71.5052890777588;

        this.zoom = 17;
        // 33.703570, 72.979746
      });
    }
  }

  send() {
    if (this.email == "" || this.phone == "") return;

    let message =
      "<p>Name: " +
      this.name +
      "</p><p>Email: " +
      this.email +
      "</p><p>Phone: " +
      this.phone +
      "</p><p>Subject: " +
      this.subject +
      "</p><p>Message: " +
      this.message;
    //  +
    // "</p><p>Message: " +
    // $("#message").text() +
    // "</p>";
    let email = {
      email: this.email,
      message: message
    };

    this.auth.sendEmail(email).subscribe(
      () => {
        console.log("email processed");
      },
      err => {
        console.error(err);
      }
    );
  }
}
