import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UsersRow} from '../../../../screens/core/users/users.component';
import {CheckboxInputComponent} from '../../../shared/checkbox-input/checkbox-input.component';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [NgForOf, CheckboxInputComponent, RouterLink],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {

  @Input() users: UsersRow[] = [];
  selectAll: boolean = false;
  selectedUsers: UsersRow[] = [];

  toggleUserSelection(user: UsersRow) {
    const index = this.selectedUsers.findIndex(selected => selected.User.id === user.User.id);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }

    this.updateSelectAllState();
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedUsers = [...this.users];
    } else {
      this.selectedUsers = [];
    }

  }

  updateSelectAllState() {
    this.selectAll = this.selectedUsers.length === this.users.length;
  }

  formatDate(RegistrationDate: Date): string {
    const day = String(RegistrationDate.getDate()).padStart(2, '0');
    const month = String(RegistrationDate.getMonth() + 1).padStart(2, '0');
    const year = RegistrationDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
