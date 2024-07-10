import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../service/current-user.service';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { TasksService } from '../../../manager/services/tasks.service';
import { UsersService } from '../../../manager/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  testChart: any = [];
  userData: any;
  country: string = '';
  creationDate: any;
  modificationDate: any;
  email: string = '';
  roleInSystem: string = '';
  imagePath: string = '';
  phoneNumber: number = 0;
  userName: string = '';
  completImage: string = 'https://upskilling-egypt.com/';
  notFoundRecipes: string = '../../../../assets/images/avatar.png';
  message: string = '';

  tasksCounter: any;
  userCounter: any = [];
  chart: any = [];
  newChart: any = [];
  allDataNewChart: any = [];

  // *SECTION
  // activatedEmployee: number = this.userCounter.activatedEmployeeCount;
  // NotActivatedEmployee: number = this.userCounter.deactivatedEmployeeCount;
  // allEmployee: number = this.userCounter.activatedEmployeeCount + this.userCounter.deactivatedEmployeeCount;
  activatedEmployee: number = 0;
  NotActivatedEmployee: number = 0;
  allEmployee: number = 0;
  rols: any = `${localStorage.getItem('userRole')}`;
  allTasks: number = 0;
  toDoTasks: number = 0;
  inProgressTasks: number = 0;
  doneTasks: number = 0;
  constructor(private _CurrentUserService: CurrentUserService, private _TasksService: TasksService, private _UsersService: UsersService) { }

  ngOnInit(): void {
    this.showChartsData();
    this.getUserInfo();
    this.userCount();
    // this.allDataInfo();
    setTimeout(() => {
      this.allDataInfo();
    }, 1000);
  }

  showChartsData() {
    this._TasksService.getTasksCount().subscribe({
      next: (response) => {
        console.log(response);
        this.tasksCounter = response;
        this.allTasks = response.toDo + response.inProgress + response.done;
        this.toDoTasks = response.toDo;
        this.inProgressTasks = response.inProgress;
        this.doneTasks = response.done;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            labels: ['To Do', 'In Progress', 'Done'],
            datasets: [{
              label: 'Data info about tasks Count',
              data: [this.tasksCounter?.toDo, this.tasksCounter?.inProgress, this.tasksCounter?.done],
              backgroundColor: ['#d8cfbe', '#ef9b28', '#0e3826'],
              hoverOffset: 4
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });
  }


  getUserInfo() {
    this._CurrentUserService.currentUser().subscribe({
      next: (response) => {
        console.log(response);
        this.userData = response;
        this.userName = response.userName;
        this.country = response.country;
        this.roleInSystem = response.group.name;
        this.email = response.email;
        this.imagePath = response.imagePath;
        this.phoneNumber = response.phoneNumber;
        this.creationDate = response.creationDate;
        this.modificationDate = response.modificationDate;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  userCount() {
    this._UsersService.getUserCount().subscribe({
      next: (respones) => {
        console.log(respones)
        this.userCounter = respones;
        this.activatedEmployee = respones.activatedEmployeeCount;
        console.log(this.activatedEmployee);
        this.NotActivatedEmployee = respones.deactivatedEmployeeCount;
        this.allEmployee = respones.activatedEmployeeCount + respones.deactivatedEmployeeCount;
      }, error: (error) => {
        console.log(error)
      }, complete: () => {
        this.newChart = new Chart('newCanvas', {
          type: 'bar',
          data: {
            labels: ['Activated Employee Count', 'No Activated Employee Count'],
            datasets: [{
              label: 'Employee statuse',
              data: [this.userCounter.activatedEmployeeCount, this.userCounter.deactivatedEmployeeCount],
              backgroundColor: [
                '#0e3826',
                '#d8cfbe'
              ],
              borderColor: [
                '#0e3826',
                '#d8cfbe'
              ],
              borderWidth: 2
            }]
          },
          options: {
            elements: {
              line: {
                borderWidth: 3
              }
            }
          },
        });
      }
    })
  }



  allDataInfo() {
    console.log(this.allEmployee);

    this.allDataNewChart = new Chart('allData', {
      type: 'radar',
      data: {
        labels: ['activated Employee', 'No activated Employee', 'All Employee', 'All Tasks', 'toDo Tasks', 'inProgress Tasks', 'done Tasks'],
        datasets: [{
          label: 'Employee statuse',
          data: [this.activatedEmployee,
          this.NotActivatedEmployee,
          this.allEmployee, 0, 0, 0, 0],
          fill: true,
          backgroundColor: '#ef9c2853',
          borderColor: '#ef9b28',
          pointBackgroundColor: '#ef9b28',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#ef9b28'
        },
        {
          label: 'Tasks statuse',
          data: [0, 0, 0, this.allTasks, this.toDoTasks, this.inProgressTasks, this.doneTasks],
          fill: true,
          backgroundColor: '#0e382653',
          borderColor: '#0e3826',
          pointBackgroundColor: '#0e3826',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#0e3826'
        }
        ]
      },
    });
  }
  // console.log();

}
