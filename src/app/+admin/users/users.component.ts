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
    this.rowData = [{name:'a',old:'20'},{name:'b',old:'22'}];
    this.columnDefs = [
      {
          headerName: 'Name', field: "name"
      },
      {
          headerName: 'Old',  field: "old"
      }
    ];
  }

  ngOnInit() {
    //初始化用户表格

  }

}
