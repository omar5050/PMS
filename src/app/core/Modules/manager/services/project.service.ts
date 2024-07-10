import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProjects(param: any): Observable<any> {
    return this._HttpClient.get('Project', { params: param })
  }

  onAddProject(data: FormGroup): Observable<any> {
    return this._HttpClient.post('Project', data)
  }

  onDeleteProject(id: number): Observable<any> {
    return this._HttpClient.delete(`Project/${id}`)
  }

  getProjectById(id: number): Observable<any> {
    return this._HttpClient.get(`Project/${id}`)
  }

  onEditProject(id: number, data:any): Observable<any> {
    return this._HttpClient.put(`Project/${id}`, data)
  }

  getManagerProjects(): Observable<any> {
    return this._HttpClient.get('Project/manager', { params: {pageSize:1000,PageNumber:1} })
  }


}
