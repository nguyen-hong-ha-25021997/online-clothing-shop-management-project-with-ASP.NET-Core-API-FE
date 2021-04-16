import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CategoriesService } from 'src/share/category.service';
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  @Input() idNew: any;
  @Input() isAddNew: boolean;
  @Input() data: any;
  myFormGroup: FormGroup;
  constructor(private modelRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private categorysv: CategoriesService
    ) {
   }

  ngOnInit(): void {
    if(this.isAddNew) {
      this.createAddForm();
    } else {
      this.createUpdateForm();
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
      this.categorysv.postCategories(this.myFormGroup.value).subscribe((rs: any) => {
        if (rs === 1) {
          this.modal.destroy(rs);
          this.message.create('success', `Thêm loại sản phẩm thành công`);

          // console.log(rs);
        } else {
          this.message.create('error', `Thêm thông tin không thành công`);
          this.modal.destroy(rs);
          // console.log(rs);
        }
      });
    }
    else {
      this.categorysv.putCategories(this.myFormGroup.getRawValue()).subscribe(
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


  createAddForm() {
    this.myFormGroup = this.fb.group({
      category_Name: [null, [Validators.required]],
      category_Quantity: [0, [Validators.required]]
    });
  }

  createUpdateForm() {
    this.myFormGroup = this.fb.group({
      category_Id: [0],
      category_Name: [null, [Validators.required]],
      category_Quantity: [0, [Validators.required]]
    });
  }

  closeModal() {
    this.modelRef.destroy(null);
  }
}
