import { Routes } from '@angular/router';
import { DashboardComponent } from './ui/screens/core/dashboard/dashboard.component';
import { ReportsComponent } from './ui/screens/core/reports/reports.component';
import { UsersComponent } from './ui/screens/core/users/users.component';
import {ProfileComponent} from './ui/screens/core/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
  { path: 'user/:id', component: ProfileComponent },
];
