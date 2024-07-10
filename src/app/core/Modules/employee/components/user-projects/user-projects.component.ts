import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteProjectComponent } from '../../../manager/manager-projects/components/delete-project/delete-project.component';
import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../../manager/services/project.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit{
  tableResponse: any;
  tableData: any[] = [];
  searchKey:string=''
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent?: PageEvent;

  

  constructor(private _ProjectService:ProjectService,private _EmployeeService: EmployeeService, private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllProjects()
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);

    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getAllProjects();
  }


  getAllProjects() {
    let paramData = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      title: this.searchKey
    }
    this._EmployeeService.getAllProjects(paramData).subscribe({
      next: (res) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = res.data;
      }
    })
  }

}
