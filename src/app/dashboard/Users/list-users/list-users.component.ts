import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../models/user.interface';
import { DashboardService } from '../../services/dashboard.service';
import {PageSettingsModel, IRow, Column } from '@syncfusion/ej2-ng-grids';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-ng-grids';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
import { UserFormComponent } from '../user-form/user-form.component';
import { CommandModel, EditSettingsModel } from '@syncfusion/ej2-ng-grids';
import { closest, setCulture, L10n } from '@syncfusion/ej2-base';

setCulture('fr-FR');

L10n.load({
  'fr-FR': {
      'grid': {
          'EmptyRecord': 'Données absentes',
          'Item': 'Ligne',
          'Items': 'Lignes',
          'ConfirmDelete': 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      },
      'pager': {
          'currentPageInfo': '{0} sur {1} pages',
          'totalItemsInfo': '({0} pages)',
          'firstPageTooltip': '1ère page',
          'lastPageTooltip': 'Dernière page',
          'nextPageTooltip': 'Page suivante',
          'previousPageTooltip': 'Page précédente',
          'nextPagerTooltip': 'Suivant',
          'previousPagerTooltip': 'Précédent'
      }
  }
});

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  showDialog = false;
  showConfirm = false;
  showForm = false;

  @ViewChild('userGrid') public userGrid: GridComponent;
  public users: Array<User> ;
  public currentUser: User;

  public pageSettings: PageSettingsModel;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('confirmDialog') confirmDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  @ViewChild('targetDiv', { read: ElementRef }) targetDiv: ElementRef;
  // The Dialog shows within the target element.
  @ViewChild('userForm') userForm: UserFormComponent;

  public targetElement: HTMLElement;
  public target = '#body';
  constructor(private dashboardService: DashboardService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

    this.pageSettings = { pageSize: 10 };

    this.dashboardService.getUsers()
    .subscribe((users: Array<User>) => {
      this.users = users;
    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });

    this.editSettings = { allowEditing: false,
      allowAdding: false, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat', click: this.onClickEdit.bind(this) } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat', click: this.onClickDelete.bind(this) } },
      { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
      { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  }


  onClickDelete(args: Event): void {
    const rowObj: IRow<Column> = this.userGrid.getRowObjectFromUID(closest(<Element>args.target, '.e-row').getAttribute('data-uid'));
    this.currentUser = <User> rowObj.data;

    this.showConfirm = true;
    // this.showForm = true;
    this.changeDetector.detectChanges();

    setTimeout(() => { this.confirmDialog.show(); });

  }

  cancelDelete() {
    this.confirmDialog.hide();
  }

  delete() {
    this.dashboardService.deleteUser(this.currentUser.id).subscribe(() => {
      this.update(this.currentUser);
      this.confirmDialog.hide();
    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });
  }


  onClickEdit(args: Event): void {
    const rowObj: IRow<Column> = this.userGrid.getRowObjectFromUID(closest(<Element>args.target, '.e-row').getAttribute('data-uid'));
    const data: Object = rowObj.data;

    this.showDialog = true;
    this.showForm = true;
    this.changeDetector.detectChanges();

    this.userForm.User = <User> data;
    this.userForm.ModificationMode = 'Edit';
    this.userForm.title = 'Modifier utilisateur';
    setTimeout(() => { this.ejDialog.show(); });
  }

  handleSelect(args: RowSelectEventArgs) {

    // this.showDialog = true;
    // this.changeDetector.detectChanges();

    this.userForm.User = <User> args.data;
    this.userForm.ModificationMode = 'Edit';
    this.userForm.title = 'Modifier utilisateur';
    setTimeout(() => { this.ejDialog.show(); });
  }

  overlayClick() {
    this.ejDialog.hide();
  }

  update(user) {
    this.dashboardService.getUsers().subscribe((users: Array<User>) => {
      this.users = users;
      this.userGrid.dataSource = users;
      this.ejDialog.hide();
      this.ejDialog.refresh();
      this.showForm = false;
      this.showDialog = false;

    },
    error => {
      // this.notificationService.printErrorMessage(error);
    });

  }

  click_AddUser() {

    this.showDialog = true;
    this.showForm = true;
    this.changeDetector.detectChanges();

    this.userForm.User = {  firstName: '', id: 0, lastName: '', office: '',   rank: '', service: '', team: '' , badgeCode: ''   };

    this.userForm.ModificationMode = 'Add';
    this.userForm.title = 'Ajouter utilisateur';
    setTimeout(() => { this.confirmDialog.show(); });
  }

  cancelSave() {
    this.ejDialog.hide();
  }

}
