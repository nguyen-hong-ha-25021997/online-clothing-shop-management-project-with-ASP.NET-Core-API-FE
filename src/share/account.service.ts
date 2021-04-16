import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


constructor(private httpClient: HttpClient) { }
public getAccounts() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Accounts`
  );
}


public postAccounts(account: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Accounts/register`, account
  );
}

public putAccounts(account: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Accounts/${account.Id}`, account
  );
}
public getAccountsByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Accounts/FindByName?Name=${name}`);
}
public deleteAccounts(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Accounts/${id}`
  );
}
}
