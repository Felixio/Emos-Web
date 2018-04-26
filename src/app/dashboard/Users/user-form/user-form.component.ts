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
  @Input() User: User = {  firstName: '', id: 0, lastName: '', office: '',   rank: '', service: '', team: ''   };
  @Input() ModificationMode: string;
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

  }

  saveUser() {
    this.dashboardService.updateUser(this.User)
    .subscribe((user: User) => {
      this.User = user;
      this.update.emit(user);
    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });
  }

  cancelSave() {
    this.cancel.emit();
  }

  }

