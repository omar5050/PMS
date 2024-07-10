import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  todo: any[] = [];
  done: any[] = [];
  inprogress: any[] = [];

  constructor(
    private _EmployeeService: EmployeeService
  ) { }
  ngOnInit() {
    this.getAllMyTasks()
  }

  getAllMyTasks() {
    let parms = {
      pageSize: 100,
      pageNumber: 1,
    }
    this._EmployeeService.getAllTasks(parms).subscribe({
      next: (res) => {
        for (let task of res.data) {
          if (task.status == 'ToDo') {
            this.todo.push(task)
          } else if (task.status == 'InProgress') {
            this.inprogress.push(task)
          } else  if (task.status == 'Done'){
            this.done.push(task)
          }
        }
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {

    this._EmployeeService.changeStatus(event.item.data, event.container.id).subscribe({
      next: (res) => {
      }
    })
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}


