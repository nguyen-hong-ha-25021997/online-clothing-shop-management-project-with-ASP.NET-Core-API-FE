import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


constructor(private httpClient: HttpClient) { }
public getProducts() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Products`
  );
}


public postProducts(product: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Products`, product
  );
}

public putProducts(product: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Products/${product.id}`, product
  );
}
public getProductsByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Products/FindByName?Name=${name}`);
}
public deleteProducts(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Products/${id}`
  );
}

public postImage(formData: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Upload`, formData
  );
}
}
