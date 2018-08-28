import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // google maps zoom level
  zoom: number = 15;

  // initial position
  lat: number = 33.6929635;
  lng: number = 73.0117814;

  gesture = "greedy";

  // marker image
  icon = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/RedDot.svg/2000px-RedDot.svg.png",
    scaledSize: {
      width: 15,
      height: 15
    }
  };

  constructor() { }

  ngOnInit() {
  }

  mapReady(event) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
    event.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('Settings'));
  }

  gm: any;
  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    this.gm = gm;
    infoWindow.open();
  }

  onMouseOut() {
    if (this.gm.lastOpen !== null) {
      this.gm.lastOpen.close();
    }
  }

}
