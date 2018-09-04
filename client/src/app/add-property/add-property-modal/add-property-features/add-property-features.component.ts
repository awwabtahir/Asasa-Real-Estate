import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-property-features',
  templateUrl: './add-property-features.component.html',
  styleUrls: ['./add-property-features.component.css']
})
export class AddPropertyFeaturesComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
