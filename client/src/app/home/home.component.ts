import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { ViewService } from "shared/services/view.service";

@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  view;

  mapView = true;
  listView = false;
  searchBarFixed = false;

  constructor(private viewService: ViewService) {}

  ngOnInit() {
    this.view = this.viewService.getView().subscribe(view => {
      if (view == "listview") {
        this.mapView = false;
        this.listView = true;
      } else {
        this.mapView = true;
        this.listView = false;
      }
    });
  }
}
