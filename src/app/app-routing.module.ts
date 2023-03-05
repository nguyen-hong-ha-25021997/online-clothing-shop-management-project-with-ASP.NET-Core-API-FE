import { DashbroadComponent } from './layout/dashbroad/dashbroad.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './category/category.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'register',
    component: CreateAccountComponent,
    children: []
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'orderdetail',
        component: OrderdetailComponent,
      },
      {
        path: 'dash-broad',
        component: DashbroadComponent,
      },
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
