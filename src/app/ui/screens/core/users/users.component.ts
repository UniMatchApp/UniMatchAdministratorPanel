import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DashboardMetricsComponent
} from "../../../components/core/dashboard/dashboard-metrics/dashboard-metrics.component";
import {NgClass} from "@angular/common";
import {ProfileInfo, ProfileService} from '../../../../data/application/services/ProfileService';
import {SearchInputComponent} from '../../../components/shared/search-input/search-input.component';
import {UsersTableComponent} from '../../../components/core/users/users-table/users-table.component';
import {Metrics, UserService} from '../../../../data/application/services/UserService';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  imports: [
    DashboardMetricsComponent,
    SearchInputComponent,
    UsersTableComponent,
    NgClass,
    FaIconComponent
  ],
  templateUrl: './users.component.html',
  standalone: true,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(UsersTableComponent) usersTableComponent!: UsersTableComponent;

  protected metrics: Metrics[] = [];
  protected usersRows: UsersRow[] = [];
  filteredStatus: string = 'All';

  currentPage: number = 1;
  pageSize: number = 5;
  totalUsers: number = 0;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faArrowRight = faArrowRight;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  async ngOnInit() {
    try {
      await Promise.all([
            this.userService.loadAllUsers(),
            this.totalUsers = await this.userService.getTotalUsersNumber(),
            this.metrics = await this.userService.getMetrics()
      ]);
      await this.loadUsers(this.currentPage);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async loadUsers(page: number, status: string = 'All'): Promise<void> {
    const offset = (page - 1) * this.pageSize;
    const parsedStatus = Status[status as keyof typeof Status] || Status.All;
    try {
      const users = await this.userService.getUserByStatus(parsedStatus, this.pageSize, offset);
      this.usersRows = await Promise.all(
        users.map(async user => {
          if(user.registered) {
            const profile = await this.profileService.getProfileInfo(user.id);
            return {
              User: profile,
              Email: user.email,
              Reported: user.reportedUsers.length,
              Status: user.status,
              RegistrationDate: user.registrationDate
            };
          } else {
            return {
              User: new ProfileInfo(user.id, user.email),
              Email: user.email,
              Reported: user.reportedUsers.length,
              Status: user.status,
              RegistrationDate: user.registrationDate
            };
          }

        })
      );
      this.totalUsers = await this.userService.getTotalUsersNumber();
      this.resetSelectAll();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async searchUserByName(name: string): Promise<void> {
    if (name) {
      const users = await this.userService.getUsersByName(name, this.pageSize, (this.currentPage - 1) * this.pageSize);

      this.usersRows = await Promise.all(users.map(async user => {
        return {
          User: await this.profileService.getProfileInfo(user.id),
          Email: user.email,
          Reported: user.reportedUsers.length,
          Status: user.status,
          RegistrationDate: user.registrationDate
        };
      }));
      this.totalUsers = await this.userService.getTotalUsersNumber();
    } else {
      this.loadUsers(this.currentPage);
    }
    this.resetSelectAll();
    this.currentPage = 1;
  }

  async filterUsers(status: string): Promise<void> {
    this.filteredStatus = status;
    await this.loadUsers(this.currentPage, status);
    this.currentPage = 1;
  }

  handleSearchChange(searchText: string): void {
    this.searchUserByName(searchText);
  }

  async nextPage()  {
    if ((this.currentPage * this.pageSize) < this.totalUsers) {
      this.currentPage++;
      await this.loadUsers(this.currentPage, this.filteredStatus);
      this.resetSelectAll();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadUsers(this.currentPage, this.filteredStatus);
      this.resetSelectAll();
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalUsers / this.pageSize));
  }

  resetSelectAll(): void {
    this.usersTableComponent.selectAll = false;
    this.usersTableComponent.selectedUsers = [];
  }

}

export interface UsersRow {
  User: ProfileInfo;
  Email: string;
  Reported: number;
  Status: Status;
  RegistrationDate: Date;
}

export enum Status {
  All = 'All',
  Active = 'Active',
  Inactive = 'Inactive'
}

