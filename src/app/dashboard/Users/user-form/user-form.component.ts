import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.interface';
import { isVisible } from '@syncfusion/ej2-base';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  notificationService: any;
   title: string;
  @Input() User: User = {  firstName: '', id: 0, lastName: '', office: '',   rank: '', service: '', team: ''   };
    ModificationMode: string ;
  @Output() update = new EventEmitter<any>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

  }

  saveUser() {

    if (this.ModificationMode === 'Edit') {
      this.title = 'Modifier utilisateur';
      this.dashboardService.updateUser(this.User)
      .subscribe((user: User) => {
        this.User = user;
        this.update.emit(user);
        },
      error => {
        // this.notificationService.printErrorMessage(error);
      });
    } else if (this.ModificationMode === 'Add') {
      this.title = 'Ajouter utilisateur';
      this.dashboardService.addUser(this.User)
      .subscribe((user: User) => {
        this.User = user;
        this.update.emit(user);
        },
      error => {
        // this.notificationService.printErrorMessage(error);
      });
    }
    this.ModificationMode = '';
     }

  }

