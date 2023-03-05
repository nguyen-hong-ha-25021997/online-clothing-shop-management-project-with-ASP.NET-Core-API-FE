import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.component.html',
  styleUrls: ['./dashbroad.component.scss']
})
export class DashbroadComponent implements OnInit {
  public primaryXAxis: Object;
  public primaryYAxis1: Object;
  public chartData: Object[];
  public title: string;
  public legendSettings: Object;

  constructor() { }

  ngOnInit() {
    this.chartData = [
      { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
      
    ];
    this.legendSettings = {
      visible: true
  }
    this.primaryXAxis = {
      valueType: 'Category'
    };
    this.primaryYAxis1 = {
      valueType: 'Category'
    };
    this.title = 'Sales Analysis';
  }

}
