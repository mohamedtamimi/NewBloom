import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    api='http://newapibloom.bloomsit.tamimysoft.com/api'
  constructor(private httpClient: HttpClient,) {

  }


  public login(username: string, password: string): Observable<any> {

    return this.httpClient.post<any>(`${this.api}/SysUser/Login`,{
        userName: username,
      password: password
    });
  }

  clearAuthData() {
    localStorage.removeItem('authData')
  }

  
}
