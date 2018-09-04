import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-property-healthcare',
  templateUrl: './add-property-healthcare.component.html',
  styleUrls: ['./add-property-healthcare.component.css']
})
export class AddPropertyHealthcareComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
