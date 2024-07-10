import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this._HttpClient.get('Users', {
      params: {
        pageSize: 10000,
        PageNumber: 1,
        groups: 2
      }
    })
  }

  getUsers(param: any): Observable<any> {
    return this._HttpClient.get('Users', { params: param })
  }
  onToggleActivate(id: number): Observable<any> {
    return this._HttpClient.put(`Users/${id}`, {})
  }

  getUserCount(): Observable<any> {
    return this._HttpClient.get('Users/count')
  }

}
