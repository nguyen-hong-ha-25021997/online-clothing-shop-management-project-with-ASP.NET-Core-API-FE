import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/share/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public accounts = {
    userName: '',
    passwword:'',
    confirmPassword:'',
    email: '',
    phone:''
  }
  constructor(public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService ) { }

  ngOnInit(): void {
  }

  public createAccount() {
    this.accountService.postAccounts(this.accounts).subscribe((response: any) => {
      alert('Thêm mới thành công');
      this.dialogRef.close(true);
    }, (error) => {
      console.log(this.accounts)
      alert('Thêm mới không thành công ');
    });
  }
}
