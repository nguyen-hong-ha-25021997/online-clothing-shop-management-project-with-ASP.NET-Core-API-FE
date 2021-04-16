import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrdersService } from 'src/share/order.service';
import { OrderDetailsService } from 'src/share/orderdetail.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit {

  public displayedColumns: string[] = ['index','order_Id', 'product_Name', 'orderDetail_Quantity','orderDetail_Amount' ];
  public dataSource = new MatTableDataSource<any>()

  public OrderDetails=[];
  public token;
  public search = '';
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };

  constructor(
    private orderdetailService: OrderDetailsService,
    private orderService: OrdersService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) {this.getOrderDetails();
    this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
 }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "orderdetail.Create")
        this.currentPermission.Create = true;

      if (element == "orderdetail.Update")
        this.currentPermission.Update = true;

      if (element == "orderdetail.Delete")
        this.currentPermission.Delete = true;
    });
  }

  public getOrderDetails() {
    this.orderdetailService.getOrderDetails().subscribe((response: any) => {
      if (response) {
        this.OrderDetails = response;
        console.log(this.OrderDetails)
        this.setOrderDetailSource(this.OrderDetails);
      }
    }, (error) => {
      this.OrderDetails = [];
      this.setOrderDetailSource(this.OrderDetails);

    });
  }

  public setOrderDetailSource(orderdetails: any[]) {
    this.dataSource.data = orderdetails;
  }

  public getOrderDetailsByOrderId() {
    this.orderdetailService.getOrderDetailsByOrderId(this.search).subscribe((response: Function[]) => {
      if (response) {
        this.OrderDetails = response;

        this.setOrderDetailSource(this.OrderDetails);
      }
    },
      (error) => { })
  }

  public deleteOrderDetail(id: string) {
    this.orderdetailService.deleteOrderDetails(id).subscribe((response: any) => {
      alert("xoa thanh cong!");
      this.getOrderDetails();
    }, (error) => {
      alert("xoa that bai!");
    });
  }
}
