import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from 'src/share/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName = '';

  public password = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(){
  }

  public login() {
    this.loginService.login(this.userName, this.password).subscribe((response: any) => {
      this.message.success('Đăng nhập thành công');
      // alert('Đăng nhập thành công!');
      localStorage.clear();
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.model))
      this.router.navigate(['/layout/dashbroad']);
    }, (error) => {
      this.message.error('Sai tài khoản hoặc mật khẩu!');
    //  alert('Sai tài khoản hoặc mật khẩu!');
      localStorage.clear();
    });
  }
}
