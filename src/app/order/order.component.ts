import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { OrdersService } from 'src/share/order.service';
import { OrderDetailsService } from 'src/share/orderdetail.service';
import { PagingParams } from 'src/share/PagingParams';
import { SearchEngine } from 'src/share/sreachEngine';
import * as moment from 'moment';
import { SharedService } from 'src/share/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isView=false;
  pageSizeOptions: any[];
  listOfData: any[] = [];
  listOfDatatmp: any[] = [];
  loading: boolean;
  valueModel = '';

  total:any;
  displayData: PagingParams = {
    PageNumber: 1,
    PageSize: 10,
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
    private orderService: OrdersService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private sharedService: SharedService,
  ) {this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
 }

  ngOnInit() {
    this.displayData.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    this.displayData.toDate = moment().format("YYYY-MM-DD");
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "order.Create")
        this.currentPermission.Create = true;

      if (element == "order.Update")
        this.currentPermission.Update = true;

      if (element == "order.Delete")
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

  changeSearch(event: any) {
    const arrCondition = ['order_Id', 'customerName','customerAddress','customerEmail','customerMobile'];
    this.listOfData = SearchEngine(this.listOfDatatmp, arrCondition, event);
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

  getPageSizeOption() {
    const pageSizeOptions1 = [];
    if (this.total > 10) {
      for (let index = 10; index < this.total; index = (index * 2)) {
        pageSizeOptions1.push(index);
        // console.log(pageSizeOptions1);
      }
    } else {
      this.displayData.PageSize = 10;
    }
    pageSizeOptions1.push(this.total);
    this.pageSizeOptions = pageSizeOptions1;
  }

  LoadData() {
    this.loading = true;
    this.orderService.getOrdersPaging(this.displayData).subscribe((rs: any) => {
      this.listOfDatatmp = rs.items;
      this.listOfData = rs.items;
      this.total = rs.totalCount;
      this.displayData.PageNumber = rs.currentPage;
      this.getPageSizeOption();
      this.loading = false;
    }, _ => {
      this.loading = false;
    });
  }

  // public getOrdersByOrderId() {
  //   this.orderService.getOrderByOrderId(this.search).subscribe((response: Function[]) => {
  //     if (response) {
  //       this.Orders = response;

  //       this.setOrderSource(this.Orders);
  //     }
  //   },
  //     (error) => { })
  // }

  public getOrderDetailsByOrderId(data) {
    this.isView = true
    this.sharedService.pushView(this.isView)
    this.sharedService.sendData(data)
    this.router.navigate(['/layout/orderdetail']);
  }

}
