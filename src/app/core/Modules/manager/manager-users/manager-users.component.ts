import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ConfirmBlockUserComponent } from './components/confirm-block-user/confirm-block-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit{
  tableResponse:any;
  userTable:any;
  users :any[]=[];
  length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent |any;
  searchKey:string=''


  constructor(private _UsersService:UsersService,private dialog:MatDialog, private _ToastrService:ToastrService){}

  ngOnInit(): void {
      this.getAllUsers();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllUsers();
  }

  getAllUsers(){
    let paramData = {
      pageSize:this.pageSize,
      pageNumber:this.pageIndex,
      userName:this.searchKey

    }
    this._UsersService.getUsers(paramData).subscribe({
      next:(res)=>{
        console.log(res.pageSize);
        this.tableResponse = res
        this.users = res.data
      }

    })
  }
  openConfirmBlockDialog(userData:any){
    console.log(userData)
    const dialogRef = this.dialog.open(ConfirmBlockUserComponent, {
      data:userData
    });

    dialogRef.afterClosed().subscribe(result=> {
      console.log('The dialog was closed');
      console.log(result)
      if(result){
        this.onToggleBlockUser(result);
        
      }
    });
  }


  onToggleBlockUser(id:number){
    this._UsersService.onToggleActivate(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:()=>{

      },
      complete:()=>{
        this.getAllUsers();
        this._ToastrService.success('Status Changed Successfuly')
      }
    })
  }

  openUserDetailes(item:any){
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data:item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result){
        
        
      }
    });

  }


}
