import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
