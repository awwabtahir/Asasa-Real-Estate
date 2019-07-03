import { Component, OnInit } from "@angular/core";
import { FilterService } from "shared/services/filter.service";
import { MapService } from "shared/services/map.service";
import { PropertyService } from "shared/services/property.service";
import { AdsService } from "shared/services/ads.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "search-filter",
  templateUrl: "./search-filter.component.html",
  styleUrls: ["./search-filter.component.css"]
})
export class SearchFilterComponent implements OnInit {
  isHouse: boolean = false;
  filterPriceForm: FormGroup;
  filterAreaForm: FormGroup;
  lowPrice: boolean = false;
  highPrice: boolean = false;
  lowArea: boolean = false;
  highArea: boolean = false;
  filterOpts = {
    type: "",
    lowPrice: null,
    highPrice: null,
    areaUnit: "sqft",
    lowArea: null,
    highArea: null
  };

  Opts = {
    type: "",
    lowPrice: null,
    highPrice: null,
    areaUnit: "sqft",
    lowArea: null,
    highArea: null
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
    private adsService: AdsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.mapService.typeEmit.subscribe(r => {
      if (
        r == " Home " ||
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
    this.formInit();
  }

  formInit() {
    this.filterPriceForm = this.fb.group({
      lowPrice: [null],
      highPrice: [null]
    });
    this.filterAreaForm = this.fb.group({
      highArea: [null],
      lowArea: [null]
    });
  }

  checkRange(val) {
    if (val.value["lowPrice"] > val.value["highPrice"]) {
      this.lowPrice = true;
      if (val.value["highPrice"] == null) {
        this.lowPrice = false;
        this.highPrice = false;
      }
    }
    if (val.value["highPrice"] != null) {
      if (val.value["highPrice"] < val.value["lowPrice"]) {
        this.highPrice = true;

        if (val.value["lowPrice"] == null) {
          this.highPrice = false;
          this.lowPrice = false;
        }
      }
    }
    if (
      val.value["lowPrice"] < val.value["highPrice"] &&
      (val.value["lowPrice"] != null || val.value["highPrice"] != null)
    ) {
      this.lowPrice = false;
      this.highPrice = false;
    }
  }

  checkAreaRange(val) {
    if (val.value["lowArea"] > val.value["highArea"]) {
      this.lowArea = true;
      if (val.value["highArea"] == null) {
        this.lowArea = false;
        this.highArea = false;
      }
    }
    if (val.value["highArea"] != null) {
      if (val.value["highArea"] < val.value["lowArea"]) {
        this.highArea = true;

        if (val.value["lowArea"] == null) {
          this.highArea = false;
          this.lowArea = false;
        }
      }
    }
    if (
      val.value["lowArea"] < val.value["highArea"] &&
      (val.value["lowArea"] != null || val.value["highArea"] != null)
    ) {
      this.lowArea = false;
      this.highArea = false;
    }
  }

  filter() {
    this.filterOpts.highPrice = this.filterPriceForm.value["highPrice"];
    this.filterOpts.lowPrice = this.filterPriceForm.value["lowPrice"];
    this.filterOpts.highArea = this.filterAreaForm.value["highArea"];
    this.filterOpts.lowArea = this.filterAreaForm.value["lowArea"];

    this.filterOpts["reset"] = false;
    // this.filterService.apply(this.filterOpts);
    this.adsService.filterPrice(this.filterOpts);
  }

  changingValue(e) {
    this.adsService.roomCount = e.target.value;
    this.adsService.roomChange.next(this.adsService.roomCount);
  }

  reset() {
    this.filterPriceForm.reset();
    this.filterAreaForm.reset();
    this.filterOpts = this.Opts;
    this.totalRooms = "All";
    this.filterOpts["reset"] = true;
    this.adsService.filterPrice(this.filterOpts);
  }
}
