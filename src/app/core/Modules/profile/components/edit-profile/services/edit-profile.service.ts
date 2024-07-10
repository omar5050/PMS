import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private _HttpClient: HttpClient) { }

  updateProfile(data: FormData): Observable<any> {
    return this._HttpClient.put('Users', data)
  }

}
