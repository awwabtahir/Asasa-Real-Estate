import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ad } from '../../../models/ad';

@Component({
  selector: 'marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.css']
})
export class MarkerModalComponent implements OnInit {

  @Input() ad: ad;
  
  constructor() { }

  ngOnInit() {
    $('#markerModal').on('show.bs.modal', function (e) {
      if (window.innerWidth < 800) {
        return e.preventDefault();
      }
    });
  }


}
