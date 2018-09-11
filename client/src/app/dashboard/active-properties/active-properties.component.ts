import { Component, OnInit, ElementRef } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ad } from '../../models/ad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-properties',
  templateUrl: './active-properties.component.html',
  styleUrls: ['./active-properties.component.css']
})
export class ActivePropertiesComponent implements OnInit {

  data: any[];
  public sortBy = "id";
  public sortOrder = "desc";

  constructor(private propertyService: PropertyService, 
  private router: Router) { }

  ngOnInit() {
    this.getAds();
  }

  getAds() {
    this.propertyService.getAds().subscribe(data => {
      this.data = data;
    }, (err) => {
      console.error(err);
    });
  }

  edit(item) {
    this.propertyService.setItemforUpdate(item);
    this.router.navigate(['/editProperty', item._id]);
  }

  itemfordelete;
  confirmDelete(item) {
    this.itemfordelete = item;
  }

  delete() {
    let index = this.data.indexOf(this.itemfordelete);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.propertyService.delete(this.itemfordelete);
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

}
