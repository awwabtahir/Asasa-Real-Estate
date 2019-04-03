import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/authentication.service";

@Component({
  selector: "regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.css"]
})
export class RegionsComponent implements OnInit {
  cities;
  locations;

  islamabadCount = 0;
  peshawarCount = 0;
  karachiCount = 0;

  constructor(private auth: AuthenticationService) {}

  async ngOnInit() {
    this.getCities();
    this.getLocations();

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    this.islamabadCount = this.getPropCounts("Islamabad");
    this.peshawarCount = this.getPropCounts("Peshawar");
    this.karachiCount = this.getPropCounts("Karachi");
  }

  getPropCounts(cityName) {
    let city = this.cities.filter(function(c) {
      return c.city == cityName;
    });
    let cityId = city[0]._id;

    let locations = this.locations.filter(function(i) {
      return i.cityId == cityId;
    });

    return locations.length;
  }

  getCities() {
    this.auth.getCities().subscribe(
      cities => {
        this.cities = cities;
      },
      err => {
        console.error(err);
      }
    );
  }

  getLocations(selectedCity?) {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations;
      },
      err => {
        console.error(err);
      }
    );
  }
}
