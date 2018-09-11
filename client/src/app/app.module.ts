import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { NgxEditorModule } from 'ngx-editor';
import { AgmOverlays } from "agm-overlays";
import {DataTableModule} from "angular-6-datatable";

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

const routes: Routes = [
  { path: '', redirectTo: '/peshawar/dha', pathMatch: 'full' },
  { path: 'peshawar/dha', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'addProperty', component: AddPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'editProperty/:id', component: AddPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'activeProperties', component: ActivePropertiesComponent, canActivate: [AuthGuardService] }
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
    ActivePropertiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonRangeSliderModule,
    UcWidgetModule,
    NgxEditorModule,
    DataTableModule,
    RouterModule.forRoot(routes),
    AgmOverlays,
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
