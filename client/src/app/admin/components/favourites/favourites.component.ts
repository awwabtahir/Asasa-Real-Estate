import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favs;

  constructor() { }

  ngOnInit() {
    let customer = JSON.parse(localStorage.getItem('customer-data'));
    this.favs = customer.favourites;
  }

}
