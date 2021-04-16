import { ProductModalComponent } from './product-modal/product-modal.component';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductsService } from 'src/share/product.service';
import { SearchEngine } from 'src/share/sreachEngine';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PagingParams } from 'src/share/PagingParams';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  pageSizeOptions: any[];
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  valueModel = '';

  total:any;
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 20,
    Keyword: '',
    SortKey: '',
    SortValue: '',
    fromDate: "",
    toDate: "",
    KeywordCol: "",
    ColName: "",
  };
  public token;
  searchValue="";
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };

  constructor(
    private productService: ProductsService,
    private modal: NzModalService,
    private message: NzMessageService,
    public jwtHelper: JwtHelperService
  ) {this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
 }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "product.Create")
        this.currentPermission.Create = true;

      if (element == "product.Update")
        this.currentPermission.Update = true;

      if (element == "product.Delete")
        this.currentPermission.Delete = true;
    });
  }

  filterTable() {
    this.LoadData();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    // console.log(pageIndex, pageSize, sortField, sortOrder, filter);
    // this.displayData.PageSize = pageSize;
    // this.displayData.PageNumber = pageIndex;
    const sortconst: any = {
      key: sortField,
      value: sortOrder
    }
    //his.sort(sortconst);
    if (sortField != null && sortOrder != null) {
      this.sort(sortconst);
    }
    if (filter.length > 0) {
      this.displayData.ColName = filter[0].key;
      this.displayData.KeywordCol = filter[0].value;
      if (this.displayData.KeywordCol == null) {
        this.displayData.KeywordCol = '';
      }
    }
    this.LoadData();
  }

  sort(sort: { key: string; value: string }): void {
    this.displayData.SortKey = sort.key;
    this.displayData.SortValue = sort.value;
    this.LoadData();
  }

  onChangeSearch(cont,event: any) {
    const arrCondition =[];
    arrCondition.push(cont);

    //console.log(arrCondition);
    this.displayData.ColName = cont;
    this.displayData.KeywordCol = event;
    //console.log(event);
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
  }

  LoadData() {
    this.loading = true;
    this.productService.getProducts().subscribe((rs: any) => {
      console.log(rs);
      this.listOfDatatmp = rs;
      this.listOfData = rs;
      console.log(this.listOfData)
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  addNewItem() {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới',
      nzContent: ProductModalComponent,
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
      nzContent:  ProductModalComponent,
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
        this.productService.deleteProducts(id).subscribe((rs: any) => {
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

  openImage(url){
    window.open(url)
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44342/${serverPath}`;
  }
}
