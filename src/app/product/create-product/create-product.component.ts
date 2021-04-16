import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/share/category.service';
import { ProductsService } from 'src/share/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public categories = []
  public selectedCategory = null;
  public response:{dbPath:''}
  public progress: number;
  public message: string;
  public products = {
    product_Name: '',
    category_Id: 0,
    product_Size: '',
    product_Image: '',
    product_Show: '',
    product_Price: 0
  }
  @Output() public onUploadFinished = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private http: HttpClient ) {
     }

  ngOnInit(): void {
    this.getAllCategories()
  }

  public createProduct() {
    this.products.product_Price = Number(this.products.product_Price);
    this.products.category_Id = Number(this.selectedCategory.category_Id);
    this.products.product_Image = this.response.dbPath;
    console.log(this.products.category_Id)
    this.productService.postProducts(this.products).subscribe((response: any) => {
      alert('Thêm mới thành công');
      this.dialogRef.close(true);
      console.log(this.products)
    }, (error) => {
      console.log(this.products)
      alert('Thêm mới không thành công ');
    });
  }

  public getAllCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response) {
        this.categories = response;
        this.selectedCategory = this.categories[0];
        console.log(this.categories)
        console.log(this.selectedCategory)
      }
    }, (error) => {
      this.categories = [];
      this.selectedCategory = null;
    });
  }

  uploadFinished = (event) =>{
    this.response = event;
  }
}
