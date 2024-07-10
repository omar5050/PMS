import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../services/tasks.service';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  taskTable: any;
  tasks: any[] = [];
  statusId:string=''
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent?: PageEvent;
  uniqueStatuses: string[] = [];

  searchkey: string = '';

  constructor(private _TasksService:TasksService, private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);

    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getAllTasks();
  }


  deleteTask(taskId: any) {
    this._TasksService.onDeleteTask(taskId).subscribe({
      next: (res) => {
        console.log(res);
      }, error: () => {

      }, complete: () => {
        this.getAllTasks();
        this._ToastrService.info('Deleted Successfuly')
      },
    })
  }
  openDeleteTaskDialog(TaskData: any) {
    console.log(TaskData)
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: TaskData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.deleteTask(result);

      }
    });
  }
 

  getAllTasks() {
    
    let paramData = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      title: this.searchkey,
      status:this.statusId
    }
    this._TasksService.getManagerTasks(paramData).subscribe({
      next: (res) => {
        console.log(res);
        this.taskTable = res;
        this.tasks = res.data;
        this.uniqueStatuses = Array.from(new Set(this.tasks.map(item => item.status)));
      }
    })
  }
}
