import { Component, OnInit } from "@angular/core";
import { FilterService } from "shared/services/filter.service";
import { MapService } from "shared/services/map.service";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "search-filter",
  templateUrl: "./search-filter.component.html",
  styleUrls: ["./search-filter.component.css"]
})
export class SearchFilterComponent implements OnInit {
  isHouse: boolean = false;
  filterOpts = {
    type: "",
    lowPrice: 0,
    highPrice: 0,
    areaUnit: "",
    lowArea: 0,
    highArea: 0
  };

  Opts = {
    type: "",
    lowPrice: 0,
    highPrice: 0,
    areaUnit: "",
    lowArea: 0,
    highArea: 0
  };

  rooms = [
    { rooms: "All", value: "All" },
    { rooms: 1, value: 1 },
    { rooms: 2, value: 2 },
    { rooms: 3, value: 3 },
    { rooms: 4, value: 4 },
    { rooms: 5, value: 5 },
    { rooms: 6, value: 6 },
    { rooms: 7, value: 7 },
    { rooms: 8, value: 8 },
    { rooms: 9, value: 9 },
    { rooms: "10+", value: "10+" }
  ];

  totalRooms = "All";

  constructor(
    private filterService: FilterService,
    private mapService: MapService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.mapService.typeEmit.subscribe(r => {
      if (
        r == "Home" ||
        r == "House" ||
        r == "Flat" ||
        r == "Upper Portion" ||
        r == "Lower Portion" ||
        r == "Farm House" ||
        r == "Room" ||
        r == "Penthouse"
      ) {
        this.isHouse = true;
      } else {
        this.isHouse = false;
      }
    });
  }

  filter() {
    this.filterOpts["reset"] = false;
    this.filterService.apply(this.filterOpts);
  }

  changingValue(e) {
    console.log(e.target.value);
    this.propertyService.roomCount = e.target.value;
    this.propertyService.roomChange.next(this.propertyService.roomCount);
  }

  reset() {
    this.filterOpts = this.Opts;
    this.totalRooms = "All";
    this.filterOpts["reset"] = true;
    this.filterService.apply(this.filterOpts);
  }
}
