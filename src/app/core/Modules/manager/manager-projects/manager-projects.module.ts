import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerProjectsRoutingModule } from './manager-projects-routing.module';
import { ManagerProjectsComponent } from './manager-projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditProjectComponent } from './components/add-edit-project/add-edit-project.component';
import { DeleteProjectComponent } from './components/delete-project/delete-project.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';


@NgModule({
  declarations: [
    ManagerProjectsComponent,
    AddEditProjectComponent,
    DeleteProjectComponent,
    ViewProjectComponent
  ],
  imports: [
    CommonModule,
    ManagerProjectsRoutingModule,
    SharedModule
  ]
})
export class ManagerProjectsModule { }
