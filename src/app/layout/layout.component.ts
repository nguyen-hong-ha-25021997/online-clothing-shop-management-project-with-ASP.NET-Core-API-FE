import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  isShowSider = true;
  isShowDrawer = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setResize();
  }
  setResize() {
    if (window.innerWidth < 992 && window.innerWidth >= 768) {
      this.isCollapsed = true;
      this.isShowSider = true;
      this.isShowDrawer = false;
    } else if (window.innerWidth >= 992) {
      this.isCollapsed = false;
      this.isShowSider = true;
      this.isShowDrawer = false;
    } else if (window.innerWidth < 768) {
      this.isShowSider = false;
      this.isCollapsed = false;
      // this.isShowDrawer = true;
    }
  }
  closeDrawer() {
    this.isCollapsed = false;
    this.isShowDrawer = false;
  }
  openDrawer() {
    this.isCollapsed = false;
    this.isShowDrawer = true;
  }

  toggleCollapsed() {
    if (window.innerWidth < 768) {
      this.openDrawer();
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
  constructor(
    private router: Router,
    ) {
      this.isLogin();
    }

  ngOnInit(){
    this.setResize();
  }


  public isLogin()
  {
    const token = localStorage.getItem('token');
    if (!token)
    {
      this.router.navigate(['/login']);
    }
  }

  selectedItem(menu) {
    console.log(menu);
  }
  public logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
