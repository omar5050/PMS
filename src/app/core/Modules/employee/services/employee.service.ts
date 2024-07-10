import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _HttpClient: HttpClient) { }


  getAllProjects(param: any): Observable<any> {
    return this._HttpClient.get('Project/employee', { params: param })
  }

  onGetAllTaskInProject(id: number, parms: any): Observable<any> {
    return this._HttpClient.get(`Task/project/${id}`, { params: parms })
  }

  getAllTasks(parms: any): Observable<any> {
    return this._HttpClient.get('Task', { params: parms })
  }

  changeStatus(id: number, status: string): Observable<any> {
    return this._HttpClient.put(`Task/${id}/change-status`, { "status": status })
  }


}
