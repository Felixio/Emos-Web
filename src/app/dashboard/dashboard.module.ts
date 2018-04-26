import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';

import { routing } from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { DashboardService } from './services/dashboard.service';
import { ListUsersComponent } from './Users/list-users/list-users.component';

import { AuthGuard } from '../auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { GridModule, CommandColumnService, EditService } from '@syncfusion/ej2-ng-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-ng-grids';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
import { UserFormComponent } from './Users/user-form/user-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    GridModule
  ],
  declarations: [RootComponent, HomeComponent, SettingsComponent, ListUsersComponent, DialogComponent, UserFormComponent],
  exports:      [ ],
  providers:    [AuthGuard, DashboardService, EditService, PageService, CommandColumnService, SortService, FilterService,  GroupService]
})
export class DashboardModule { }
