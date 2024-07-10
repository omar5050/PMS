import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'resetPassword', component: ResetPasswordComponent, title: 'resetPassword' },
  { path: 'dashboard', canActivate: [authGuard], loadChildren: () => import('../core/Modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
