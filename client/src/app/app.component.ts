import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { LocationService } from "shared/services/location.service";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";

declare let ga: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit {
  ga;
  constructor(
    private router: Router,
    private locationService: LocationService,
    private slimScroll: SlimLoadingBarService
  ) {}
  ngOnInit() {
    this.slimScroll.progress = 20;
    this.slimScroll.start();
  }
  ngAfterViewInit() {
    if (!this.ga) this.ga = ga;
    this.locationService.setGa(this.ga);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ga("set", "page", event.urlAfterRedirects);
        this.ga("send", "pageview");
      }
    });
  }
}
