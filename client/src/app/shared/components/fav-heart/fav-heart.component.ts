import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/authentication.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'fav-heart',
  templateUrl: './fav-heart.component.html',
  styleUrls: ['./fav-heart.component.css']
})
export class FavHeartComponent implements OnInit, OnDestroy {

  @Input() adId; 
  ad_id;
  customer;
  fav = false;

  private sub: any;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ad_id = +params['id'];
    });

    if(this.adId) {
      this.ad_id = this.adId;
    }

    this.setCustomerDetails();
    for (var i = 0; i < this.customer.favourites.length; i++) {
      if (this.ad_id == this.customer.favourites[i]) {
        this.fav = true;
        break;
      }
    }

  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  favClicked() {
    if (!this.auth.isLoggedIn())
      $('#signinModel').modal('show');
    else {
      if (!this.fav) this.addFav();
      else this.removeFav();
    }

  }

  addFav() {
    this.setCustomerDetails();
    this.customer.favourites.push(this.ad_id);
    this.updateCustomerDetails(this.customer);
    this.fav = true;
  }

  removeFav() {
    var index = this.customer.favourites.indexOf(this.ad_id);
    if (index > -1) {
      this.customer.favourites.splice(index, 1);
    }
    this.updateCustomerDetails(this.customer);
    this.fav = false;
  }

  setCustomerDetails() {
    this.customer = JSON.parse(localStorage.getItem('customer-data'));
  }

  updateCustomerDetails(data) {
    localStorage.setItem('customer-data', JSON.stringify(data));
    let fav = {};
    fav['userId'] = data.userId;
    fav['favourites'] = data.favourites;
    this.auth.updateFav(data).subscribe(() => {
      console.log("Added");
    }, (err) => {
      console.error(err);
    });
  }

}
