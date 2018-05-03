import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.interface';
import { isVisible } from '@syncfusion/ej2-base';
import { DashboardService } from '../../services/dashboard.service';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  notificationService: any;
   title: string;
   errors: string;
   UsersCount: number;
   showMessage = false;
   message: string;
   ShowCheckBox = false;
   alreadyVerified = false;
   forceAddUser = false;
   @Input() User: User = {  firstName: '', id: 0, badgeCode: '' ,  lastName: '', office: '',   rank: '', service: '', team: ''   };
    ModificationMode: string ;
  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

  }

  saveUser() {
    this.errors = '';
    if (this.User.badgeCode === '' || this.User.firstName === '' || this.User.lastName === ''
    || this.User.office === '' || this.User.rank === '' || this.User.service === '' || this.User.team === '' ) {
      this.errors = 'données non valides';
      return;
    }

    if (this.ModificationMode === 'Edit') {
      this.title = 'Modifier utilisateur';
      this.showMessage = false;
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

      if (!this.alreadyVerified) {
        this.dashboardService.verifUsers(this.User.firstName, this.User.lastName )
          .subscribe((users: Array<User>) => {
            this.alreadyVerified = true;
            this.UsersCount = users.length;
            if (this.UsersCount > 0) {
              this.showMessage = true;
              this.ShowCheckBox = true;
              this.message = this .UsersCount + ' utilisateur(s) avec le même nom existe déjà , voulez vous créer quand même ?';
            } else {
              this.dashboardService.addUser(this.User)
              .subscribe((user: User) => {
                this.User = user;
                this.update.emit(user);
            },
           error => {
            // this.notificationService.printErrorMessage(error);
          });
            }
          });
      } else if (this.forceAddUser) {
          this.showMessage = false;
          this.dashboardService.addUser(this.User)
            .subscribe((user: User) => {
              this.User = user;
              this.update.emit(user);
            },
           error => {
            // this.notificationService.printErrorMessage(error);
          });
        }
      }
  }


  cancelSave() {
    this.cancel.emit();
  }

  }

