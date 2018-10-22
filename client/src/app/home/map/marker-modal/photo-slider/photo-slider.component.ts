import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'shared/services/image.service';

@Component({
  selector: 'photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css']
})
export class PhotoSliderComponent implements OnInit {

  @Input() images: any;

  constructor() { }

  ngOnInit() {
  }

}
