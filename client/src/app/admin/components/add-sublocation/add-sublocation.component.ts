import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-sublocation",
  templateUrl: "./add-sublocation.component.html",
  styleUrls: ["./add-sublocation.component.css"]
})
export class AddSublocationComponent implements OnInit {
  cities = [];
  locations = [];
  location;
  subLocation;
  access: any;
  user: any;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.getCities();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.access = this.user.access;
    if (this.access == "agent") {
      this.getLocations();
    }
  }

  add() {
    if (this.location["subLocations"] == undefined)
      this.location["subLocations"] = [];
    this.location["subLocations"].push({
      subLocation: this.subLocation
    });
  }

  remove(subLoc) {
    let index = this.location["subLocations"].indexOf(subLoc);
    if (index > -1) {
      this.location["subLocations"].splice(index, 1);
    }
  }

  push() {
    this.auth.updateLocation(this.location).subscribe(
      () => {
        this.router.navigateByUrl("/dashboard");
      },
      err => {
        console.error(err);
      }
    );
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

  cityChange(cityObj, prevData?) {
    $(":focus").blur();
    let cityId = cityObj._id;
    this.getLocations(cityId);
  }

  getLocations(selectedCity?) {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations;

        if (selectedCity)
          this.locations = locations.filter(function(loc) {
            return loc.cityId == selectedCity;
          });

        if ((this.access = "agent")) {
          console.log("check");
          this.filterLocations();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  locationChange(locObj) {
    $(":focus").blur();
    let locId = locObj._id;
    this.location = locObj;
  }

  filterLocations() {
    {
      console.log(this.locations);
      var loc = [];
      for (var arr in this.locations) {
        for (var filter in this.user.locationId) {
          console.log(
            this.locations[arr].location,
            this.user.locationId[filter]
          );
          if (this.locations[arr].location == this.user.locationId[filter]) {
            loc.push(this.locations[arr]);
            console.log(loc);
          }
        }
      }
      this.locations = loc;
      setTimeout(() => {
        console.log(this.locations);
      }, 3000);
    }
  }
}
