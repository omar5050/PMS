import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [{ path: '', component: EmployeeComponent }, 
{ path: 'user-projects', loadChildren: () => import('./components/user-projects/user-projects.module').then(m => m.UserProjectsModule) },
{ path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule), title: 'tasks' }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
