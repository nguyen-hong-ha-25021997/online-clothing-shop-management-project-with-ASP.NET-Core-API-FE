import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


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
}
