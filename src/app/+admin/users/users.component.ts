import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { UserService } from '../../core/user/user.service';
import { saveMode } from '../../enums';
import { User } from '../../core/entity/user';


declare var $: any;

@Component({
  selector: 'usersadmin',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit,  AfterViewInit{

  public userSaveMode = saveMode;//对话框保存模式（更新，新增)

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  @ViewChild("userDetailModal") private userDetailModal;
  @ViewChild("userDetail") private userDetail;
  
  public modalTitle: string;
  public delUsersButtonDisabled = true;

  private startRow = 0;


  constructor(private userService:UserService) { 
    // console.log('users.components created:'+userService);
  }

  ngOnInit() {
    //初始化用户表格
    this.gridOptions = <GridOptions>{
      rowSelection:"multiple",
      rowModelType:'pagination',
      paginationPageSize:20
    };
    
    this.columnDefs = [
      {
        headerName: '#',
        width:30,
        checkboxSelection: true
      },
      {
        headerName: '序号',
        width:50,
        cellRenderer: (params:any) => {
          return this.startRow + params.rowIndex + 1;
        } 
      },
      {
        headerName: '用户名', field: "id"
      },
      {
        headerName: '姓名',  field: "name"
      },
      {
        headerName: '角色名', field: 'role.name'
      }
    ];
  }

  ngAfterViewInit(){
    this.setUserDataSource();
  }

   //用户列表数据源
  setUserDataSource(){
    let userDataSource = {
      getRows:(params: any) => {
        let pageIndex = Math.floor(params.startRow / this.gridOptions.paginationPageSize);
        this.userService.getUsersWithPage(pageIndex,this.gridOptions.paginationPageSize)
          .then( data => {
            params.successCallback(data.rows, data.rowCount);
          });
          this.startRow = params.startRow;
      }
                  
    }
    this.gridOptions.api.setDatasource(userDataSource);
  } 

  public addUserModalShow():void{
    this.modalTitle = "添加用户";
    this.userDetail.saveMode = saveMode.add;
    this.userDetail.reset();
    this.userDetail.user = new User();
    this.userDetailModal.show();
  }

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    this.userDetailModal.hide();
    //提示保存成功或失败
    let boxTitle: string;
    let boxColor: string;
    if(event.sucess){
      boxTitle = "提示";
      boxColor = "#296191";
    }else{
      boxTitle = "错误";
      boxColor = "#c00";
    }
    $.smallBox({
      title: boxTitle,
      content: event.message,
      color: boxColor,
      iconSmall: "fa fa-info",
      timeout: 4000
    });
    //重置对话框
    if(this.userDetail){
      this.userDetail.reset();
    }
    //刷新用户列表
    this.refreshUserList();
  }

  //双击用户列表行事件
  public dblClickRow(event){
    this.modalTitle = "编辑用户";
    this.userDetail.saveMode = saveMode.update;
    let user: User = new User();
    user.clone(event.data);
    this.userDetail.user = user;
    this.userDetailModal.show();
  }

  //单击删除按钮
  public deleteButtonClick(){
    var selectedRows = this.gridOptions.api.getSelectedRows();
    if(confirm("确认删除选中的"+selectedRows.length.toString()+"条记录吗？")){
      this.userService.deleteUsers(selectedRows).then(() => {
                                                              this.refreshUserList();
                                                            });
    }
  }

  //刷新用户列表
  private refreshUserList(){
    this.setUserDataSource();
  }

  setDelUserButtonStatus(){
    if(this.gridOptions.api.getSelectedRows().length > 0){
      this.delUsersButtonDisabled = false;
    }else{
      this.delUsersButtonDisabled = true;
    }
    
  }
}
