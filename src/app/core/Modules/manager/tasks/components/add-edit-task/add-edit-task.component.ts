import { Component } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITasks } from '../../../models/tasks';
import { Observable, map, startWith } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent {

  tableResponseManager: any;
  tableDataManager: any[] = [];
  tableResponseEmployee: any;
  tableDataUsers: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  viewTaskId: number = 0;
  tasksById: ITasks | any;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | any;

  constructor(private _TasksService: TasksService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, 
    private _ToastrService: ToastrService, private _ProjectService:ProjectService,private _UsersService:UsersService) {
    this.viewTaskId = _ActivatedRoute.snapshot.params['id'];
    console.log(this.viewTaskId)

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {

    this.getListManagersProjects();
    this.getListUsers();

    if (this.viewTaskId > 0) {
      this.getTaskById(this.viewTaskId);
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  taskForm = new (FormGroup)({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    employeeId: new FormControl(null, [Validators.required]),
    projectId: new FormControl(null, [Validators.required]),
  })


  getTaskById(id: number) {
    this._TasksService.getTaskById(id).subscribe({
      next: (response) => {
        console.log(response)
        this.tasksById = response;
        console.log(this.tasksById)
      }, error: (error) => {
        // this._ToastrService.error('error in edit process')
      }, complete: () => {
        this.taskForm.patchValue({
          title: this.tasksById.title,
          description: this.tasksById.description,
          employeeId: this.tasksById.employee.id,
          projectId: this.tasksById.project.id
        });
        // this._ToastrService.success('edit process success')

      }
    })
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    
    if (this.viewTaskId) {
      this.editTask(data);
    } else {
      this.addTask(data);
    }
  }

  addTask(data: any) {
    console.log(data.value);
    this._TasksService.onAddTask(data.value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {
        this._ToastrService.error('error in this process')

      }, complete: () => {
        this._Router.navigate(['/core/dashboard/manager/tasks']);
        this._ToastrService.success('Operation Accomplished Successfully')

      }
    })
  }

  editTask(data:any) {
    console.log(data.value);
    this._TasksService.onEditTask(this.viewTaskId, data.value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {
        this._ToastrService.error('error in this process')

      }, complete: () => {
        this._Router.navigate(['/core/dashboard/manager/tasks']);
        this._ToastrService.success('Operation Accomplished Successfully')

      }
    })
  }

  getListManagersProjects() {
    this._ProjectService.getManagerProjects().subscribe({
      next:(res)=>{
        console.log(res);
        this.tableDataManager = res.data;
      }
    })
  }

  getListUsers() {
    this._UsersService.getAllUsers().subscribe({
      next:(res)=>{
        console.log(res);
        this.tableDataUsers = res.data;
      }
    })
  }
}
