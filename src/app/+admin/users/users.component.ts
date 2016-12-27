import { Component, OnInit } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'usersadmin',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.rowData = 
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
