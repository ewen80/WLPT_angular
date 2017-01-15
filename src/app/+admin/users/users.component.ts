import { Component, OnInit, ViewChild } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { UserService } from '../../core/user/user.service';
import { saveMode } from '../../enums';


declare var $: any;

@Component({
  selector: 'usersadmin',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public userSaveMode = saveMode;

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  @ViewChild("userDetailModal") private userDetailModal;
  public modalTitle: string;


  constructor(private userService:UserService) { 
    // console.log('users.components created');
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

  public addUserModalShow():void{
    this.modalTitle = "添加用户";
    this.userDetailModal.show();
  }

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    this.userDetailModal.hide();
    //提示保存成功或失败
    $.smallBox({
      title: "提示消息",
      content: "保存成功",
      color: "#296191",
      //timeout: 8000,
      // icon: "fa fa-info swing ",
      iconSmall: "fa fa-info",
      timeout: 4000
    });
    //刷新用户列表
    this.userService.getUsers().then( users => {
                                        this.gridOptions.api.setRowData(users);
                                    }); 
  }
}
