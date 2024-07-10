import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'add', component: AddEditTaskComponent, title: 'add' },
  { path: 'edit/:id', component: AddEditTaskComponent, title: 'edit' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
