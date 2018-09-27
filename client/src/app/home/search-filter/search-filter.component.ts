import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  filterOpts = {
    lowPrice: 0,
    highPrice: 0,
    areaUnit: "",
    lowArea: 0,
    highArea: 0
  };

  constructor() { }

  ngOnInit() {
  }

  filter() {
    console.log(this.filterOpts);
  }

}
