import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/share/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  registerFrom: FormGroup;
  public accounts = {
    userName: '',
    passWord:'',
    confirmPassword:'',
    email: '',
    phone:''
  }
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  CreateForm() {
    this.registerFrom = this.fb.group({
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  public createAccount() {
    this.accountService.postAccounts(this.accounts).subscribe((response: any) => {
      alert('Thêm mới thành công');
    }, (error) => {
      console.log(this.accounts)
      alert('Thêm mới không thành công ');
    });
  }

  submitForm() {

  }
}
