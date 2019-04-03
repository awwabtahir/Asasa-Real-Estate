import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { ViewService } from "shared/services/view.service";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  innerWidth: number;
  view;

<<<<<<< HEAD
  view;

  mapView = true;
  listView = false;

  constructor(
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.view = this.viewService.getView().subscribe(view => {
      if(view == "listview") {
        this.mapView = false;
        this.listView = true;
      } else {
        this.mapView = true;
        this.listView = false;
      }
    });

=======
  mapView = true;
  listView = false;
  mapSearchBar = false;
  num: number;

  constructor(
    private viewService: ViewService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
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
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.num = this.doc.documentElement.scrollTop;
    if (this.innerWidth > 600) {
      //previos was 640
      if (this.num > 565) {
        this.mapSearchBar = true;
      } else if (this.num < 565) {
        this.mapSearchBar = false;
      }
    }
    if (this.innerWidth < 600) {
      //previos was 420
      if (this.num > 345) {
        this.mapSearchBar = true;
      } else if (this.num < 345) {
        this.mapSearchBar = false;
      }
    }
>>>>>>> upload-ready
  }
}
