import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './category/category.component';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';
import { CategoriesService } from 'src/share/category.service';
import { AccountComponent } from './account/account.component';
import { UpdateAccountComponent } from './account/update-account/update-account.component';
import { AccountService } from 'src/share/account.service';
import { ProductsService } from 'src/share/product.service';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { OrderDetailsService } from 'src/share/orderdetail.service';
import { OrdersService } from 'src/share/order.service';
import { UploadComponent } from './upload/upload.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccumulationChartAllModule, ChartModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from './product/product-modal/product-modal.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LayoutComponent } from './layout/layout.component';
import { DashbroadComponent } from './layout/dashbroad/dashbroad.component';
import { CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
  SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    CategoryComponent,
    CategoryModalComponent,
    LayoutComponent,
    AccountComponent,
    CreateAccountComponent,
    UpdateAccountComponent,
    ProductComponent,
    OrderComponent,
    OrderdetailComponent,
    UploadComponent,
    ProductModalComponent,
    DashbroadComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzLayoutModule,
    NzDropDownModule,
    NzMenuModule,
    NzPaginationModule,
    NzStepsModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSwitchModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzCarouselModule,
    NzDescriptionsModule,
    NzListModule,
    NzPopoverModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimelineModule,
    NzToolTipModule,
    NzAlertModule,
    NzDrawerModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzSkeletonModule,
    NzSpinModule,
    NzBackTopModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzCommentModule,
    NzResultModule,
    NzCollapseModule,
    NzStatisticModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    NgxSpinnerModule,
    ChartModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200"],
      },
    }),
  ],
  
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    CategoriesService, AccountService, ProductsService, OrderDetailsService, OrdersService,
    CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
