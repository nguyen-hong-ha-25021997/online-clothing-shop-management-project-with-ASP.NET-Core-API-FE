import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagingParams } from './PagingParams';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
      })
    };
  }

constructor(private httpClient: HttpClient) { }
public getOrders() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Orders`
  );
}

public postOrders(order: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Orders`, order
  );
}

public putOrders(order: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Orders/${order.id}`, order
  );
}
public getOrderByOrderId(id: string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Orders/${id}`);
}
public deleteOrders(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Orders/${id}`
  );
}
public getOrdersPaging(data: PagingParams) {
  const str = `${environment.localDomain}/api/Orders/GetAllPaging?SortValue=` + data.SortValue
  + `&SortKey=` + data.SortKey
  + `&PageSize=` + data.PageSize
  + `&PageNumber=` + data.PageNumber
  + `&Keyword=` + data.Keyword
  + `&fromDate=` + data.fromDate
  + `&toDate=` + data.toDate
  + `&keywordCol=` + data.KeywordCol
  + `&colName=` + data.ColName
  return this.httpClient.get(str,this.getHeader());
}
}
