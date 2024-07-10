import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { InfoComponent } from './components/info/info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
