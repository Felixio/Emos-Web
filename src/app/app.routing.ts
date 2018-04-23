import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './dashboard/Users/list-users/list-users.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard/list-users', component: ListUsersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
