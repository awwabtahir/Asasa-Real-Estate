import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add-property-biz-comm',
  templateUrl: './add-property-biz-comm.component.html',
  styleUrls: ['./add-property-biz-comm.component.css']
})
export class AddPropertyBizCommComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
