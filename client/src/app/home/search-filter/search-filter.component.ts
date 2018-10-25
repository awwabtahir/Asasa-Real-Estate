import { Component, OnInit } from '@angular/core';
import { FilterService } from 'shared/services/filter.service';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

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

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
  }

  filter() {
    this.filterOpts["reset"] = false;
    this.filterService.apply(this.filterOpts);
  }

  reset() {
    this.filterOpts = this.Opts;
    this.filterOpts["reset"] = true;
    this.filterService.apply(this.filterOpts);
  }

}
