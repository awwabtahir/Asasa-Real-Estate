import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  @Input() id;

  constructor() { }

  ngOnInit() {
  }

}
