import { Component, OnInit } from '@angular/core';
import { ViewService } from 'shared/services/view.service';

@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.component.html',
  styleUrls: ['./map-home.component.css']
})
export class MapHomeComponent implements OnInit {

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

  }
}
