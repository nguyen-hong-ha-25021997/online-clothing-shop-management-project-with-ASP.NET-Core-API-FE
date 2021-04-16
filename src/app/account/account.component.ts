import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/share/account.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'normalizedUserName', 'email','phoneNumber', 'controls' ];

  public dataSource = new MatTableDataSource<any>()

  public Accounts=[];
  public token;
  public search = '';
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) {this.getAccounts();
    this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
 }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "category.Create")
        this.currentPermission.Create = true;

      if (element == "category.Update")
        this.currentPermission.Update = true;

      if (element == "category.Delete")
        this.currentPermission.Delete = true;
    });
  }

  public getAccounts() {
    this.accountService.getAccounts().subscribe((response: any) => {
      if (response) {
        this.Accounts = response;
        this.setAccountSource(this.Accounts);
      }
    }, (error) => {
      this.Accounts = [];
      this.setAccountSource(this.Accounts);

    });
  }

  public setAccountSource(accounts: any[]) {
    this.dataSource.data = accounts;
  }

  public openAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAccounts();
    });
  }

  public openUpdateAccountDialog(accounts: any): void {
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      width: '50vw',

        data: accounts

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAccounts();
    });
  }

  public getAccountsByName() {
    this.accountService.getAccountsByName(this.search).subscribe((response: Function[]) => {
      if (response) {
        this.Accounts = response;

        this.setAccountSource(this.Accounts);
      }
    },
      (error) => { })
  }

  public deleteAccount(id: string) {
    this.accountService.deleteAccounts(id).subscribe((response: any) => {
      alert("xoa thanh cong!");
      this.getAccounts();
    }, (error) => {
      alert("xoa that bai!");
    });
  }
}
