import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'shared/shared.module';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { FooterComponent } from './home/footer/footer.component';
import { LinksComponent } from './home/footer/links/links.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './home/map/map.component';
import { MarkerModalContentComponent } from './home/map/marker-modal/marker-modal-content/marker-modal-content.component';
import { MarkerModalComponent } from './home/map/marker-modal/marker-modal.component';
import { PhotoSliderComponent } from './home/map/marker-modal/photo-slider/photo-slider.component';
import { MarkerComponent } from './home/map/marker/marker.component';
import { PropertyComponent } from './home/property/property.component';
import { SearchFilterComponent } from './home/search-filter/search-filter.component';
import { SearchComponent } from './home/search/search.component';
import { KeysPipe } from './keys.pipe';
import { LoginComponent } from './navbar/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './navbar/register/register.component';
import { SafeResourceUrlPipe } from './safe-resource-url.pipe';
import { SocialLoginComponent } from './home/social-login/social-login.component';
import { TermsComponent } from './home/footer/terms/terms.component';
import { PrivacyComponent } from './home/footer/privacy/privacy.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("290889998216820")
        }
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("Your-Google-Client-Id")
        // }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    MapComponent,
    PropertyComponent,
    FooterComponent,    
    NavbarComponent,    
    MarkerComponent,
    MarkerModalComponent,
    PhotoSliderComponent,
    KeysPipe,
    SafeResourceUrlPipe,
    MarkerModalContentComponent,    
    SearchFilterComponent,
    LinksComponent,
    SocialLoginComponent,
    TermsComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,    
    NgSelectModule,
    SocialLoginModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAStx_HXP0pu0TvzaNnu9q3a1VL4R-LSX8',
      libraries: ["places"]
    })
  ],
  providers: [
    AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
