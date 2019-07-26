import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/authentication.service";

const data = {
  chart: {
    caption: "Cities With Most Ads",

    xaxisname: "Cities",

    theme: "fusion"
  },
  data: [
    {
      label: "Islamabad",
      value: "200"
    },
    {
      label: "Karachi",
      value: "180"
    },
    {
      label: "Peshawar",
      value: "150"
    },
    {
      label: "Quetta",
      value: "140"
    },
    {
      label: "Lahore",
      value: "115"
    },
    {
      label: "Multan",
      value: "100"
    }
  ]
};
@Component({
  selector: "regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.css"]
})
export class RegionsComponent implements OnInit {
  width = 600;
  height = 400;
  type = "column2d";
  dataFormat = "json";
  dataSource = data;
  cities;
  locations;
  locationJSON = [];

  islamabadCount = 0;
  peshawarCount = 0;
  karachiCount = 0;

  constructor(private auth: AuthenticationService) {}

  async ngOnInit() {
    await this.getCities();
  }

  // getPropCounts(cityName) {
  //   let city = this.cities.filter(function(c) {
  //     return c.city == cityName;
  //   });
  //   let cityId = city[0]._id;

  //   let locations = this.locations.filter(function(i) {
  //     return i.cityId == cityId;
  //   });

  //   return locations.length;
  // }

  generateJSON() {
    // tslint:disable-next-line: forin
    for (let item in this.cities) {
      let loc = this.locations.filter(r => {
        return this.cities[item]._id == r.cityId;
      });

      this.locationJSON[item] = {
        img: "assets/images/" + this.cities[item].city.toLowerCase() + ".jpg",
        locations: loc.length,
        city: this.cities[item].city
      };
      // console.log(this.locationJSON);
    }
  }
  getCities() {
    let promise = new Promise((resolve, reject) => {
      this.auth.getCities().subscribe(
        cities => {
          this.cities = cities;
          this.getLocations();
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
    let promise = new Promise((resolve, reject) => {
      this.auth.getLocations().subscribe(
        locations => {
          this.locations = locations;
          this.generateJSON();
          resolve("done");
        },
        err => {
          console.error("Error", err);
          reject(new Error("…"));
        }
      );
    });
  }
}
