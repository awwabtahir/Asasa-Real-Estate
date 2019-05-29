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
    await this.getCities();
    await this.getLocations();

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
    let promise = new Promise((resolve, reject) => {
      this.auth.getCities().subscribe(
        cities => {
          this.cities = cities;
          resolve("done");
        },
        err => {
          console.error("Error", err);
          reject(new Error("…"));
        }
      );
    });
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
