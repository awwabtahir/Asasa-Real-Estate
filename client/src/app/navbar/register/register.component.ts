import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {TokenPayload} from 'shared/models/token';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  credentials = {
    email: '',
    phone: '',
    name: '',
    password: '',
    access: 'agent',
    cityId: null,
    locationId: [],
    subLocations: []
  };
  cities = [];
  locations = [];
  location;

  id: number;
  private sub: any;
  edit = false;

  constructor(
    private auth: AuthenticationService, 
    private router: Router,
    private route: ActivatedRoute) 
  {}

  async ngOnInit() {
    this.getCities();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAgent(this.id);
    });

    if(this.id) {
      this.edit = true;
      await new Promise((resolve, reject) => setTimeout(resolve, 1500));
      this.setAgent(this.agent);
    }
  }
  
  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard/agents');
    }, (err) => {
      console.error(err);
    });
  }

  update() {
    this.credentials["_id"] = this.agent._id;
    this.auth.updateAgent(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard/agents');
    }, (err) => {
      console.error(err);
    });
  }

  cityChange(cityObj) {
    $(':focus').blur();
    let cityId = cityObj._id;
    this.getLocations(cityId);
  }

  locChange(locObj) {
    $(':focus').blur();
    let locations = [];
    for(var i = 0; i < locObj.length; i++)
      locations.push(locObj[i].location);
    this.credentials.locationId = locations;
  }

  getCities() {
    this.auth.getCities().subscribe(cities => {
      this.cities = cities;
    }, (err) => {
      console.error(err);
    });
  }

  getLocations(selectedCity?) {
    this.auth.getLocations().subscribe(locations => {
      this.locations = locations;
      if (selectedCity)
        this.locations = locations.filter(function (loc) {
          return loc.cityId == selectedCity;
        });
    }, (err) => {
      console.error(err);
    });
  }

  agent;
  getAgent(id) {
    this.auth.getAgents().subscribe(data => {
      this.agent = data.filter(function (d) {
        return d._id == id;
      });
      this.agent = this.agent[0];
    }, (err) => {
      console.error(err);
    });
  }

  setAgent(agent) {
    this.credentials.name = agent.name;
    this.credentials.phone = agent.phone;
    this.credentials.email = agent.email;
    this.credentials.cityId = parseInt(agent.cityId);
    this.getLocations(parseInt(agent.cityId));
    this.credentials.locationId = agent.locationId;
  }

}
