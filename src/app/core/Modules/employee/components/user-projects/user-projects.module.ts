import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProjectsRoutingModule } from './user-projects-routing.module';
import { UserProjectsComponent } from './user-projects.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserProjectsComponent
  ],
  imports: [
    CommonModule,
    UserProjectsRoutingModule,
    SharedModule
  ]
})
export class UserProjectsModule { }
