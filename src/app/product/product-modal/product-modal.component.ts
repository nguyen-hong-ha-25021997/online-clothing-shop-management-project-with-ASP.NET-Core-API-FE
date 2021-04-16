import { ProductsService } from './../../../share/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CategoriesService } from 'src/share/category.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() data: any;
  myFormGroup: FormGroup;
  categories: any[] = []
  
  public response:{dbPath:''}
  public progress: number;
  public uploadmessage: string;

  constructor(
    private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private productsv: ProductsService,
    private categorysv: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categorysv.getCategories().subscribe((rs:any) =>{
      this.categories = rs;
    })
    this.createForm();
    if(this.isAddNew) {
      this.myFormGroup.get(`product_Id`).setValue(this.idNew);
    } else {
      this.myFormGroup.patchValue({
        ...this.data
      });
    }
  }
  saveChanges() {
    if(this.myFormGroup.invalid) {
      for (const i in this.myFormGroup.controls) {
        this.myFormGroup.controls[i].markAsDirty();
        this.myFormGroup.controls[i].updateValueAndValidity();
      }
      return;
    }
    // console.log('submitted');
    if (this.isAddNew === true) {
      // console.log('api insert');
      this.myFormGroup.get('product_Image').setValue(this.response.dbPath);
      this.productsv.postProducts(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Thêm chênh lệch thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.productsv.putProducts(this.myFormGroup.getRawValue()).subscribe(
        (result: any) => {
          if (result === 1) {
            // console.log(result);
            this.message.create('success', `Cập nhật thông tin chênh lệch thành công`);
            this.modal.destroy(result);
            
          } else {
            this.message.create('error', `Sửa thông tin không thành công`);
            // console.log(result);
            this.modal.destroy(result);
          }
        }
      );
    }
    //const myFormGroupData = this.myFormGroup.getRawValue();
    //this.modelRef.destroy(myFormGroupData);
  }

  changeNhaCungCap(event: any) {
    if (this.myFormGroup.get(`category_Id`).dirty) {
      const data = this.categories.find(x => x.category_Id === event);
      this.myFormGroup.get('category_Name').setValue(data.category_Name);
    }
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      product_Id: [0],
      category_Id: [0],
      category_Name: [null],
      product_Name: [null],
      product_Style: [null],
      product_Size: [null],
      product_Image: [null],
      product_Price: [0],
      product_Show: [null],
      product_Quantity: [0],
      product_Note: [null],
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }

  uploadFinished = (event) =>{
    this.response = event;
  }
}
