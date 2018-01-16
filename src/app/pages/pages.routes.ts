import { RouterModule, Routes } from "@angular/router";
import { LoginGuardGuard, AdminGuard } from './../services/service.index';

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from "./users/users.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { DoctorComponent } from "./doctors/doctor.component";
import { SearchComponent } from "./search/search.component";



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bars' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
      { path: 'search/:query', component: SearchComponent, data: { titulo: 'Buscador' } },

      // Mantenimientos
      { path: 'users', component: UsersComponent, canActivate: [ AdminGuard ], data: { titulo: 'Mantenimiento de Usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { titulo: 'Mantenimiento de Médicos' } },
      { path: 'doctor/:id', component: DoctorComponent, data: { titulo: 'Actualizar Médico' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
