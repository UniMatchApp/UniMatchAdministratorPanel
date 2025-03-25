import { Component, OnInit } from '@angular/core';
import { DashboardMetricsComponent } from "../../../components/core/dashboard/dashboard-metrics/dashboard-metrics.component";
import { DashboardUsersStatsComponent } from "../../../components/core/dashboard/dashboard-users-stats/dashboard-users-stats.component";
import {NgClass, NgForOf} from "@angular/common";
import { MockUserService } from '../../../../data/infrastructure/services/user/MockUserService';
import { Profile } from '../../../../data/domain/models/Profile';
import { ProfileInfo } from '../../../../data/application/services/ProfileService';
import { SearchInputComponent } from '../../../components/shared/search-input/search-input.component';
import { UsersTableComponent } from '../../../components/core/users/users-table/users-table.component';
import { User } from '../../../../data/domain/models/User';
import { MockProfileService } from '../../../../data/infrastructure/services/profile/MockProfileService';

@Component({
  selector: 'app-users',
  imports: [
    DashboardMetricsComponent,
    DashboardUsersStatsComponent,
    NgForOf,
    SearchInputComponent,
    UsersTableComponent,
    NgClass
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  protected metrics: any[] = [];
  protected users: User[] = [];
  protected usersRows: UsersRow[] = [];
  protected filteredUsers: UsersRow[] = [];
  filteredStatus: string = 'All';

  constructor(
    private userService: MockUserService,
    private profileService: MockProfileService,
  ) {}

  async ngOnInit() {
    this.metrics = await this.userService.getMetrics();
    this.users = await this.userService.getAllUsers();

    this.usersRows = await Promise.all(this.users.map(async user => {
      return {
        User: await this.profileService.getProfileInfo(user.id),
        Reported: user.reportedUsers.length,
        Status: Status.Active,
        RegistrationDate: user.registrationDate
      };
    }));

    const hardcodedUserRow: UsersRow = {
      User: new ProfileInfo('hardcodedId', 'Hardcoded User', 'hardcoded@email.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5ADlPRzadXlwAPooxqAaaja2nimcQyxcjA&s'),
      Reported: 3,
      Status: Status.Inactive,
      RegistrationDate: new Date('2023-01-01')
    };

    this.usersRows.push(hardcodedUserRow);


    this.filteredUsers = this.usersRows;
  }

  filterUsers(status: string): void {
    this.filteredStatus = status;
    if (status === 'All') {
      this.filteredUsers = this.usersRows;
    } else {
      this.filteredUsers = this.usersRows.filter(user => user.Status === status);
    }
  }
  searchUserByName(name: string): void {
    if (name) {
      this.filteredUsers = this.usersRows.filter(user =>
        user.User.name.toLowerCase().includes(name.toLowerCase())
      );
    } else {
      this.filteredUsers = this.usersRows;
    }
  }

  handleSearchChange(searchText: string): void {
    this.searchUserByName(searchText);
  }
}

export interface UsersRow {
  User: ProfileInfo;
  Reported: number;
  Status: Status;
  RegistrationDate: Date;
}

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive'
}
