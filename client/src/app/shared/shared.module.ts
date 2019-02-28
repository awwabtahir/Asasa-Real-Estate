import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthGuardService } from './services/auth-guard.service';
import { ImageService } from './services/image.service';
import { LocationService } from './services/location.service';
import { MapService } from './services/map.service';
import { PropertyModalService } from './services/property-modal.service';
import { PropertyService } from './services/property.service';
import { FilterService } from './services/filter.service';
import { ListviewComponent } from './components/listview/listview.component';
import { FavHeartComponent } from './components/fav-heart/fav-heart.component';
import { CallComponent } from './components/call/call.component';
import { RouterModule } from '@angular/router';
import { ViewService } from './services/view.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ListviewComponent,
    FavHeartComponent,
    CallComponent
  ],
  providers: [
    AuthGuardService,
    PropertyService,
    MapService,
    PropertyModalService,
    LocationService,
    ImageService,
    FilterService,
    ViewService
  ],
  exports: [
    ListviewComponent,
    FavHeartComponent,
    CallComponent
  ]
})
export class SharedModule { }
