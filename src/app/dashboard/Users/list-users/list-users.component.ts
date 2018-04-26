import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { DashboardService } from '../../services/dashboard.service';
import {PageSettingsModel } from '@syncfusion/ej2-ng-grids';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-ng-grids';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  showDialog = false;
  @ViewChild('userGrid')
  public userGrid: GridComponent;
  public users: Array<User> ;
  public pageSettings: PageSettingsModel;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('targetDiv', { read: ElementRef }) targetDiv: ElementRef;
  // The Dialog shows within the target element.
  @ViewChild('userForm') userForm: UserFormComponent;

  public targetElement: HTMLElement;
  public target = '#body';
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.pageSettings = { pageSize: 10 };

    this.dashboardService.getUsers()
    .subscribe((users: Array<User>) => {
      this.users = users;
    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });
    this.userForm.ModificationMode = '';
  }

  // initializeTarget() {
  //   this.targetElement = this.container.nativeElement.parentElement;

  // }

  handleSelect(args: RowSelectEventArgs) {

    this.showDialog = true;
     console.log(args.data);

    // this.initializeTarget();
    this.userForm.User = <User> args.data;
     this.userForm.ModificationMode = 'Edit';
     this.userForm.title = 'Modifier utilisateur';
     this.ejDialog.show();

  }

  overlayClick() {
    this.ejDialog.hide();
  }

  update(user) {
        this.dashboardService.getUsers()
   .subscribe((users: Array<User>) => {
      this.users = users;
      this.userGrid.dataSource = users;
         },
    error => {
      // this.notificationService.printErrorMessage(error);
    });
    this.ejDialog.hide();
    this.ejDialog.refresh();
  }
  click_AddUser() {

    this.showDialog = true;
    this.userForm.User = {  firstName: '', id: 0, lastName: '', office: '',   rank: '', service: '', team: ''   };
    this.userForm.ModificationMode = 'Add';
    this.userForm.title = 'Ajouter utilisateur';
    this.ejDialog.show();

  }

}
