import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user/user.service';
import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'usersadmin',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  constructor(private userService:UserService) { 
    
  }

  ngOnInit() {
    //初始化用户表格
    this.gridOptions = <GridOptions>{};
    this.userService.getUsers().then( users => this.rowData = users);
    this.columnDefs = [
      {
          headerName: '用户名', field: "id"
      },
      {
          headerName: '姓名',  field: "name"
      }
    ];
  }

}
