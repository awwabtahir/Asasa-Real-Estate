import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-property-rooms',
  templateUrl: './add-property-rooms.component.html',
  styleUrls: ['./add-property-rooms.component.css']
})
export class AddPropertyRoomsComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
