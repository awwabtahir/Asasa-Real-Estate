import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthGuardService } from './services/auth-guard.service';
import { ImageService } from './services/image.service';
import { LocationService } from './services/location.service';
import { MapService } from './services/map.service';
import { PropertyModalService } from './services/property-modal.service';
import { PropertyService } from './services/property.service';
import { FilterService } from './services/filter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuardService,
    PropertyService,
    MapService,
    PropertyModalService,
    LocationService,
    ImageService,
    FilterService
  ]
})
export class SharedModule { }
