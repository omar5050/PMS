import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../Guards/admin.guard';
import { userGuard } from '../../Guards/user.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'home' },
    { path: 'manager', canActivate: [adminGuard], loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule) },
    { path: 'employee', canActivate: [userGuard], loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
    { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
