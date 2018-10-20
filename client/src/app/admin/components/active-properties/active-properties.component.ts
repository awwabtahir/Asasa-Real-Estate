import { Component, OnInit, ElementRef } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { ad } from 'shared/models/ad';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';

@Component({
  selector: 'app-active-properties',
  templateUrl: './active-properties.component.html',
  styleUrls: ['./active-properties.component.css']
})
export class ActivePropertiesComponent implements OnInit {

  data: any[];
  public sortBy = "id";
  public sortOrder = "desc";
  user;
  agent = false;
  agents;

  constructor(private propertyService: PropertyService,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.access == "agent") this.agent = true;
    this.getAds();
    this.getAgents();
  }

  getAds() {
    this.propertyService.getAds().subscribe(data => {
      this.data = data;
      if (this.agent) {
        let userId = this.user.userId;
        this.data = data.filter(function (d) {
          return d.userId == userId;
        });
      }
    }, (err) => {
      console.error(err);
    });
  }

  getAgents() {
    this.auth.getAgents().subscribe(agents => {
      this.agents = agents;
    }, (err) => {
      console.error(err);
    });
  }

  edit(item) {
    this.propertyService.setItemforUpdate(item);
    this.router.navigate(['/dashboard/editProperty', item._id]);
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

  getName(userId) {
    if(!userId) return "";
    let agent = this.agents.filter(function (d) {
      return d._id == userId;
    });
    return agent[0].name;
  }

}
