import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";

import { AuthGuardService } from "./services/auth-guard.service";
import { ImageService } from "./services/image.service";
import { LocationService } from "./services/location.service";
import { MapService } from "./services/map.service";
import { PropertyModalService } from "./services/property-modal.service";
import { PropertyService } from "./services/property.service";
import { FilterService } from "./services/filter.service";
import { ListviewComponent } from "./components/listview/listview.component";
import { FavHeartComponent } from "./components/fav-heart/fav-heart.component";
import { CallComponent } from "./components/call/call.component";
import { RouterModule } from "@angular/router";
import { ViewService } from "./services/view.service";
import { AdsService } from "shared/services/ads.service";
import { ModalModule } from "ngx-bootstrap";
import { MarkerModalContentComponent } from "app/home/map/marker-modal/marker-modal-content/marker-modal-content.component";
import { PhotoSliderComponent } from "app/home/map/marker-modal/photo-slider/photo-slider.component";
import { AgmCoreModule } from "@agm/core";
import { EmailComponent } from "app/home/email/email.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule,CommonModule, RouterModule, NgxPaginationModule, ModalModule, AgmCoreModule.forRoot({
    apiKey: "AIzaSyCHA1nWRxqPxa86h3_FdsLdkEf-vJVkoU4",
    libraries: ["places"]
  }),],
  declarations: [EmailComponent, PhotoSliderComponent, MarkerModalContentComponent, ListviewComponent, FavHeartComponent, CallComponent],
  providers: [
    AuthGuardService,
    PropertyService,
    MapService,
    PropertyModalService,
    LocationService,
    ImageService,
    FilterService,
    ViewService,
    AdsService
  ],
  exports: [EmailComponent, PhotoSliderComponent, MarkerModalContentComponent, ListviewComponent, FavHeartComponent, CallComponent]
})
export class SharedModule {}
