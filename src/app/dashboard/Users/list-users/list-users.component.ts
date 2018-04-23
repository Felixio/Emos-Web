import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users: Array<User>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUsers()
    .subscribe((users: Array<User>) => {
      this.users = users;
    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });
  }

}
