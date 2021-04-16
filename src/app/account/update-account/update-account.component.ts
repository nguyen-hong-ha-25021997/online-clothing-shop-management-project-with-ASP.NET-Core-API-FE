import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/share/account.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  public accounts = {
    id:0,
    normalizedUserName: '',
    email: '',
    phoneNumber:''
  }
  constructor(public dialogRef: MatDialogRef<UpdateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountsService: AccountService) {
      this.accounts.id = this.data.id;
      this.accounts.normalizedUserName = this.data.normalizedUserName;
      this.accounts.email = this.data.email;
      this.accounts.phoneNumber = this.data.phoneNumber;
     }

  ngOnInit(

  ) {
  }

  public updateEquipmentCatalog() {
    this.accountsService.putAccounts(this.accounts).subscribe((response: any) => {
      alert('Cập nhật thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
      console.log(this.accounts)
    });
  }
}
