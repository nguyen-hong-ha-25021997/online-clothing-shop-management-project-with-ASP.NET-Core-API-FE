import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


constructor(private httpClient: HttpClient) { }
public getCategories() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Categories`
  );
}


public postCategories(category: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Categories`, category
  );
}

public putCategories(category: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Categories/${category.category_Id}`, category
  );
}
public getCategoriesByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Categories/FindByName?Name=${name}`);
}
public deleteCategories(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Categories/${id}`
  );
}
}
