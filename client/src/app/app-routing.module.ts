import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LinksComponent } from "./home/footer/links/links.component";
import { HomeComponent } from "./home/home.component";
import { MarkerModalContentComponent } from "./home/map/marker-modal/marker-modal-content/marker-modal-content.component";
import { LoginComponent } from "./navbar/login/login.component";
import { RegisterComponent } from "./navbar/register/register.component";
import { AuthGuardService } from "shared/services/auth-guard.service";
import { TermsComponent } from "./home/footer/terms/terms.component";
import { PrivacyComponent } from "./home/footer/privacy/privacy.component";
import { AboutUsComponent } from "./home/about_us/about_us.component";
import { ContactUsComponent } from "./home/contact_us/contact_us.component";
import { HelpAndSupportComponent } from "./home/help_and_support/help_and_support.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "links", component: LinksComponent },
  { path: "terms", component: TermsComponent },
  { path: "privacy-policy", component: PrivacyComponent },
  { path: "login", component: LoginComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "contactus", component: ContactUsComponent },
  { path: "help", component: HelpAndSupportComponent },

  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "editAgent/:id",
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  },
  // { path: "property-details/:id", component: MarkerModalContentComponent },
  {
    path: "dashboard",
    loadChildren: "../app/admin/admin.module#AdminModule"
  },
  { path: ":city", component: HomeComponent },
  { path: ":city/:location", component: HomeComponent }
 
  // { path: ":city/:location/:type/:id", component: MarkerModalContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
