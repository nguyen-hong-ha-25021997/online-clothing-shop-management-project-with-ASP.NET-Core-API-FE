import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {


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
}
