import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _HttpClient: HttpClient) { }

  getManagerTasks(param: any): Observable<any> {
    return this._HttpClient.get('Task/manager', { params: param })
  }

  getTasksCount(): Observable<any> {
    return this._HttpClient.get('Task/count')
  }

  onAddTask(data: FormGroup): Observable<any> {
    return this._HttpClient.post('Task', data)
  }

  onEditTask(id: number, data: FormGroup): Observable<any> {
    return this._HttpClient.put(`Task/${id}`, data);
  }

  onDeleteTask(id: number): Observable<any> {
    return this._HttpClient.delete(`Task/${id}`)
  }

  getTaskById(id: number): Observable<any> {
    return this._HttpClient.get(`Task/${id}`)
  }

  getAllManagers(param: any): Observable<any> {
    return this._HttpClient.get('Users/Manager', { params: param })
  }

  getAllEmployees(param: any): Observable<any> {
    return this._HttpClient.get('Users', { params: param })
  }

}
