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

  constructor(private userservice:UserService) { 
    this.gridOptions = <GridOptions>{};
    userservice.getUsers().then( user => this.rowData.push(user));
    this.columnDefs = [
      {
          headerName: '用户名', field: "userid"
      },
      {
          headerName: '姓名',  field: "name"
      }
    ];
  }

  ngOnInit() {
    //初始化用户表格

  }

}
