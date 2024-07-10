import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';
import { RouterModule } from '@angular/router';

interface Menu {
  text: string;
  link: string;
  icone: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpened: boolean = true;


  notFoundRecipes: string = '../../../../assets/images/avatar.png';


  constructor(private _CoreService: CoreService) { }
  isAdmin(): boolean {
    return this._CoreService.role == 'Manager' ? true : false;
  }
  isUser(): boolean {
    return this._CoreService.role == 'Employee' ? true : false;
  }

  Menu: Menu[] = [
    {
      text: 'Home',
      link: '/core/dashboard/home',
      icone: 'fa-solid fa-house',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      text: 'Users',
      link: '/core/dashboard/manager/users',
      icone: 'fa-solid fa-users',
      isActive: this.isAdmin(),
    },
    {
      text: 'Projects',
      link: '/core/dashboard/manager/projects',
      // <i class="fa-solid fa-users-rectangle"></i>
      icone: 'fa-solid fa-layer-group',
      isActive: this.isAdmin(),
    },
    {
      text: 'Tasks',
      link: '/core/dashboard/manager/tasks',
      icone: 'fa-solid fa-list-check',
      isActive: this.isAdmin(),
    },
    {
      text: 'Projects',
      link: '/core/dashboard/employee/user-projects',
      icone: 'fa-solid fa-layer-group',
      isActive: this.isUser(),
    },
    {
      text: 'Tasks',
      link: '/core/dashboard/employee/tasks',
      icone: 'fa-solid fa-list-check',
      isActive: this.isUser(),
    }
  ]


}
