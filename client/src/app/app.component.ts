import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  ga;
  constructor(private router: Router) {}

  ngAfterViewInit() {
    if(!this.ga) this.ga = ga;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ga('set', 'page', event.urlAfterRedirects);
        this.ga('send', 'pageview');
      }
    });
  }

  
}
