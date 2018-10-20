import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { ActivePropertiesComponent } from './components/active-properties/active-properties.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AddSublocationComponent } from './components/add-sublocation/add-sublocation.component';
import { AgentsComponent } from './components/agents/agents.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCityLocComponent } from './components/edit-city-loc/edit-city-loc.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
    { path: '', 
      component: DashboardComponent, 
      canActivate: [AuthGuardService] },

    { path: 'profile', 
        component: ProfileComponent, 
        canActivate: [AuthGuardService] },

    { path: 'addProperty', 
        component: AddPropertyComponent, 
        canActivate: [AuthGuardService] },

    { path: 'addLocation', 
        component: AddLocationComponent, 
        canActivate: [AuthGuardService] },

    { path: 'editLocation/:id', 
        component: AddLocationComponent, 
        canActivate: [AuthGuardService] },

    { path: 'addSubLocation', 
        component: AddSublocationComponent, 
        canActivate: [AuthGuardService] },

    { path: 'addCity', 
        component: AddCityComponent, 
        canActivate: [AuthGuardService] },

    { path: 'editProperty/:id', 
        component: AddPropertyComponent, 
        canActivate: [AuthGuardService] },

    { path: 'editCityLoc', 
        component: EditCityLocComponent, 
        canActivate: [AuthGuardService] },

    { path: 'activeProperties', 
        component: ActivePropertiesComponent, 
        canActivate: [AuthGuardService] },

    { path: 'agents', 
        component: AgentsComponent, 
        canActivate: [AuthGuardService] }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }