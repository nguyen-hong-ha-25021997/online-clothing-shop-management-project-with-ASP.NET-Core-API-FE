import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagingParams } from './PagingParams';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
      })
    };
  }

constructor(private httpClient: HttpClient) { }
public getOrderDetails() {
  return this.httpClient.get(
    `${environment.localDomain}/api/OrderDetails`
  );
}

public postOrderDetails(orderdetail: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/OrderDetails`, orderdetail
  );
}

public putOrderDetails(orderdetail: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/OrderDetails/${orderdetail.id}`, orderdetail
  );
}

public getOrderDetailsByOrderId(id:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/OrderDetails/${id}`);
}

public deleteOrderDetails(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/OrderDetails/${id}`
  );
}
public getOrderDetailsPaging(data: PagingParams, orderData) {
  console.log(orderData.order_Id)
  const str = `${environment.localDomain}/api/OrderDetails/GetAllPaging?SortValue=` + data.SortValue
  + `&SortKey=` + data.SortKey
  + `&PageSize=` + data.PageSize
  + `&PageNumber=` + data.PageNumber
  + `&Keyword=` + data.Keyword
  + `&fromDate=` + data.fromDate
  + `&toDate=` + data.toDate
  + `&keywordCol=` + data.KeywordCol
  + `&colName=` + data.ColName
  + `&order_Id=` + orderData.order_Id
  return this.httpClient.get(str,this.getHeader());
}
}
