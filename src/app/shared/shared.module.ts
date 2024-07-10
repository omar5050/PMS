import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    ToastrModule,
    MatPaginatorModule,
    FormsModule,
    NgxDropzoneModule,
    MatAutocompleteModule,
    MatSelectModule,
    DragDropModule

  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    SidebarComponent,
    NavbarComponent,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    MatDialogModule,
    ToastrModule,
    MatPaginatorModule,
    FormsModule,
    NgxDropzoneModule,
    MatAutocompleteModule,
    MatSelectModule,
    DragDropModule

  ],

  declarations: [SharedComponent, SidebarComponent, NavbarComponent]
})
export class SharedModule { }
