import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }
  public getProducts() {
    return this.httpClient.get(
      `${environment.localDomain}/api/Reports`
    );
  }
  public getBaoCao(){
    return this.httpClient.get(
      `${environment.localDomain}/api/Reports/ReportsAnnual`);
  }

  public getBaoCaoDaily(){
    return this.httpClient.get(
      `${environment.localDomain}/api/Reports/ReportsDaily`);
  }
}
