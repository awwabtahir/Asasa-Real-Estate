import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { NgxEditorModule } from 'ngx-editor';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { PropertyComponent } from './property/property.component';
import { FooterComponent } from './footer/footer.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { PropertyService } from './property.service';
import { AddPropertyFeaturesComponent } from './add-property/add-property-modal/add-property-features/add-property-features.component';
import { AddPropertyLocationComponent } from './add-property/add-property-location/add-property-location.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPropertyModalComponent } from './add-property/add-property-modal/add-property-modal.component';
import { AddPropertyBizCommComponent } from './add-property/add-property-modal/add-property-biz-comm/add-property-biz-comm.component';
import { AddPropertyNearbyLocComponent } from './add-property/add-property-modal/add-property-nearby-loc/add-property-nearby-loc.component';
import { AddPropertyRoomsComponent } from './add-property/add-property-modal/add-property-rooms/add-property-rooms.component';
import { AddPropertyHealthcareComponent } from './add-property/add-property-modal/add-property-healthcare/add-property-healthcare.component';
import { AddPropertyOtherComponent } from './add-property/add-property-modal/add-property-other/add-property-other.component';
import { AddPropertyPlotFeaturesComponent } from './add-property/add-property-modal/add-property-plot-features/add-property-plot-features.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'addProperty', component: AddPropertyComponent, canActivate: [AuthGuardService] }
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
    AddPropertyPlotFeaturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonRangeSliderModule,
    UcWidgetModule,
    NgxEditorModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAStx_HXP0pu0TvzaNnu9q3a1VL4R-LSX8',
      libraries: ["places"]
    })
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    PropertyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
