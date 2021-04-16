import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  public login(userName: string, password: string) {
    return this.httpClient.post(
      `${environment.localDomain}/api/Accounts/Login`,
      {
        userName: userName,
        password: password
      }
    );
  }
}
