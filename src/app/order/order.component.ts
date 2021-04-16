import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrdersService } from 'src/share/order.service';
import { OrderDetailsService } from 'src/share/orderdetail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public displayedColumns: string[] = ['index','order_Id', 'order_PurchaseTime', 'order_DeliveryTime','order_DeliveryAddress','order_DeliveryContact','order_Status','order_Amount' ];
  public dataSource = new MatTableDataSource<any>()

  public Orders=[];
  public token;
  public search = '';
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };

  constructor(
    private orderService: OrdersService,
    private orderdetailService: OrderDetailsService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) {this.getOrders();
    this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
 }

  ngOnInit() {
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

  public getOrders() {
    this.orderService.getOrders().subscribe((response: any) => {
      if (response) {
        this.Orders = response;
        console.log(this.Orders)
        this.setOrderSource(this.Orders);
      }
    }, (error) => {
      this.Orders = [];
      this.setOrderSource(this.Orders);

    });
  }

  public setOrderSource(orders: any[]) {
    this.dataSource.data = orders;
  }

  public getOrdersByOrderId() {
    this.orderService.getOrderByOrderId(this.search).subscribe((response: Function[]) => {
      if (response) {
        this.Orders = response;

        this.setOrderSource(this.Orders);
      }
    },
      (error) => { })
  }

  // public getOrderDetailsByOrderId() {
  //   this.orderdetailService.getOrderDetailsByOrderId(this.search).subscribe((response: Function[]) => {
  //     if (response) {
  //       this.Orders = response;

  //       this.setOrderSource(this.Orders);
  //     }
  //   },
  //     (error) => { })
  // }

  public deleteOrder(id: string) {
    this.orderService.deleteOrders(id).subscribe((response: any) => {
      alert("xoa thanh cong!");
      this.getOrders();
    }, (error) => {
      alert("xoa that bai!");
    });
  }
}
