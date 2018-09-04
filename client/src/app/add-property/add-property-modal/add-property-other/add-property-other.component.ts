import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-property-other',
  templateUrl: './add-property-other.component.html',
  styleUrls: ['./add-property-other.component.css']
})
export class AddPropertyOtherComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
