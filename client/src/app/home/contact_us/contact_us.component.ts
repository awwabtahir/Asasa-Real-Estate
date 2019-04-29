import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "shared/services/map.service";
import { AuthenticationService } from "app/authentication.service";

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
    url: "../../../assets/images/House.png",
    scaledSize: {
      width: 60,
      height: 80
    }
  };
  title: string = "AGM project";
  latitude: number;
  longitude: number;
  zoom: number;

  constructor() {}

  ngOnInit() {
    this.setCurrentLocation();
  }
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = 33.703422;
        this.longitude = 72.979708;
        this.zoom = 17;
      });
    }
  }
}
