import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { NgxEditorModule } from 'ngx-editor';
import {DataTableModule} from "angular-6-datatable";
import { NgSelectModule } from '@ng-select/ng-select';
import { FilePondModule, registerPlugin } from 'ngx-filepond';

import { AppComponent } from './app.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { LoginComponent } from './navbar/login/login.component';
import { RegisterComponent } from './navbar/register/register.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { MapComponent } from './home/map/map.component';
import { PropertyComponent } from './home/property/property.component';
import { FooterComponent } from './home/footer/footer.component';
import { AddPropertyComponent } from './dashboard/add-property/add-property.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PropertyService } from './services/property.service';
import { PropertyModalService } from './services/property-modal.service';
import { MapService } from './services/map.service';
import { LocationService } from './services/location.service';
import { ImageService } from './services/image.service';

import { AddPropertyFeaturesComponent } from './dashboard/add-property/add-property-modal/add-property-features/add-property-features.component';
import { AddPropertyLocationComponent } from './dashboard/add-property/add-property-location/add-property-location.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPropertyModalComponent } from './dashboard/add-property/add-property-modal/add-property-modal.component';
import { AddPropertyBizCommComponent } from './dashboard/add-property/add-property-modal/add-property-biz-comm/add-property-biz-comm.component';
import { AddPropertyNearbyLocComponent } from './dashboard/add-property/add-property-modal/add-property-nearby-loc/add-property-nearby-loc.component';
import { AddPropertyRoomsComponent } from './dashboard/add-property/add-property-modal/add-property-rooms/add-property-rooms.component';
import { AddPropertyHealthcareComponent } from './dashboard/add-property/add-property-modal/add-property-healthcare/add-property-healthcare.component';
import { AddPropertyOtherComponent } from './dashboard/add-property/add-property-modal/add-property-other/add-property-other.component';
import { AddPropertyPlotFeaturesComponent } from './dashboard/add-property/add-property-modal/add-property-plot-features/add-property-plot-features.component';
import { ActivePropertiesComponent } from './dashboard/active-properties/active-properties.component';
import { MarkerComponent } from './home/map/marker/marker.component';
import { MarkerModalComponent } from './home/map/marker-modal/marker-modal.component';
import { PhotoSliderComponent } from './home/map/marker-modal/photo-slider/photo-slider.component';
import { KeysPipe } from './keys.pipe';
import { SafeResourceUrlPipe } from './safe-resource-url.pipe';
import { MarkerModalContentComponent } from './home/map/marker-modal/marker-modal-content/marker-modal-content.component';
import { AddCityComponent } from './dashboard/add-city/add-city.component';
import { AddLocationComponent } from './dashboard/add-location/add-location.component';
import { SearchFilterComponent } from './home/search-filter/search-filter.component';
import { LinksComponent } from './links/links.component';
import { UploadImage3dComponent } from './dashboard/add-property/upload-image3d/upload-image3d.component';
import { UploadImagesComponent } from './dashboard/add-property/upload-images/upload-images.component';
import { AddSublocationComponent } from './dashboard/add-sublocation/add-sublocation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'property-details', component: MarkerModalContentComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'addProperty', component: AddPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'addLocation', component: AddLocationComponent, canActivate: [AuthGuardService] },
  { path: 'addSubLocation', component: AddSublocationComponent, canActivate: [AuthGuardService] },
  { path: 'addCity', component: AddCityComponent, canActivate: [AuthGuardService] },
  { path: 'editProperty/:id', component: AddPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'activeProperties', component: ActivePropertiesComponent, canActivate: [AuthGuardService] },
  { path: ':city', component: HomeComponent },
  { path: ':city/:location', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    MapComponent,
    PropertyComponent,
    FooterComponent,
    AddPropertyComponent,
    NavbarComponent,
    AddPropertyFeaturesComponent,
    AddPropertyLocationComponent,
    DashboardComponent,
    AddPropertyModalComponent,
    AddPropertyBizCommComponent,
    AddPropertyNearbyLocComponent,
    AddPropertyRoomsComponent,
    AddPropertyHealthcareComponent,
    AddPropertyOtherComponent,
    AddPropertyPlotFeaturesComponent,
    ActivePropertiesComponent,
    MarkerComponent,
    MarkerModalComponent,
    PhotoSliderComponent,
    KeysPipe,
    SafeResourceUrlPipe,
    MarkerModalContentComponent,
    AddCityComponent,
    AddLocationComponent,
    SearchFilterComponent,
    LinksComponent,
    UploadImage3dComponent,
    UploadImagesComponent,
    AddSublocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilePondModule,
    NgxEditorModule,
    DataTableModule,
    NgSelectModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAStx_HXP0pu0TvzaNnu9q3a1VL4R-LSX8',
      libraries: ["places"]
    })
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    PropertyService,
    MapService,
    PropertyModalService,
    LocationService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
