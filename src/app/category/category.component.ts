import { CategoryModalComponent } from './category-modal/category-modal.component';

import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/share/category.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchEngine } from 'src/share/sreachEngine';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'category_Name', 'category_Quantity','controls' ];

  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  valueModel = '';

  public token;
  public search = '';
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private categoryService: CategoriesService,
    public jwtHelper: JwtHelperService
  ) {this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));}

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "category.Create")
        this.currentPermission.Create = true;

      if (element == "category.Update")
        this.currentPermission.Update = true;

      if (element == "category.Delete")
        this.currentPermission.Delete = true;
    });
    this.LoadData();
  }

  LoadData() {
    this.loading = true;
    this.categoryService.getCategories().subscribe((rs: any) => {
      console.log(rs);
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: CategoryModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '25%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        idNew: this.listOfData.length + 1,
        isAddNew: true
      },
    });
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  changeSearch(event: any) {
    const arrCondition = ['category_Name','category_Quantity'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  editItem(data, index) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật',
      nzContent:  CategoryModalComponent,
      nzClosable: false,
      nzFooter: 'null',
      nzWidth: '25%',
      nzStyle: {
        top: '10px'
      },
      nzComponentParams: {
        data: data,
      },
    })
    ;
    modal.afterClose.subscribe((rs: any) => {
      if (rs) {
        this.ngOnInit();
      }
    });
  }
  
  removeItem(id) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: '<b style="color: red;">Hãy cân nhắc thật kỹ trước khi xóa</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.categoryService.deleteCategories(id).subscribe((rs: any) => {
          if (rs === -1) {
            this.message.error('Dữ liệu đang được sử dụng, không thể xóa');
            return;
          }
          if (rs > 0) {
            this.message.success('Xóa thành công');
            this.LoadData();
          } else {
            this.message.error('Lỗi xóa dữ liệu');
          }
        }, _ => {
          this.message.error('Error delete');
          console.log('Error delete');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
