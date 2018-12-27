import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() id;
  
  constructor() { }

  ngOnInit() {
  }

}
