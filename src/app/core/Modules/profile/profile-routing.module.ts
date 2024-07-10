import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { InfoComponent } from './components/info/info.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      { path: 'info', component: InfoComponent },
      { path: 'edit', component: EditProfileComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
