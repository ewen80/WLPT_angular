import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { UserService } from '../../core/services/user.service';
import { saveMode } from '../../enums';
import { User } from '../../core/entity/user';
import { Role } from "app/core/entity/role";
import { RoleService } from "app/core/services/role.service";


declare var $: any;

@Component({
  selector: 'usersadmin',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit,  AfterViewInit{

  public userSaveMode: saveMode;//对话框保存模式（更新，新增)
  public selectedUser: User = new User(); //当前用户
  public gridOptions:GridOptions;
  public columnDefs:any[];

  @ViewChild("userDetailModal") private userDetailModal;
  @ViewChild("userDetail") private userDetail;
  
  public modalTitle: string;
  public delUsersButtonDisabled = true;

  private startRow = 0;

  private allRoles:Role[];


  constructor(private userService:UserService, private roleService:RoleService) { 
    // console.log('users.components created:'+userService);
  }

  ngOnInit() {
    this.roleService.getAllRoles()
      .then(response =>this.allRoles = response);

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
        headerName: '角色id',
        cellRenderer: (params:any) => {
          return '<a title=\'角色名: '+params.data.roleName+'\'>'+params.data.roleId+'</a>'
        }
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
            var newRows:Array<any> = new Array<any>();
            //将角色名加入数据源
            data.rows.forEach(user => {
              newRows.push(Object.assign({},{ roleName:this.allRoles.find(role=>role.id === user.roleId).name},user));
            });
            params.successCallback(newRows, data.rowCount);
          });
          this.startRow = params.startRow;
      }
                  
    }
    this.gridOptions.api.setDatasource(userDataSource);
  } 

  public addUserModalShow():void{
    this.modalTitle = "添加用户";
    this.userSaveMode = saveMode.add;
    this.selectedUser = new User();
    this.userDetailModal.show();
  }

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    this.userDetailModal.hide();
    let boxTitle:string,boxColor:string;
    if(event.sucess){
      boxTitle = "提示";
      boxColor = "#296191";
    }else{
      boxTitle = "错误";
      boxColor = "#c00";
    }
    this.showHint(boxTitle, boxColor, event.message);
    //重置对话框
    if(this.userDetail){
      this.userDetail.reset(new User());
    }
    //刷新用户列表
    this.refreshUserList();
  }

  //弹出提示框
  private showHint(boxTitle, boxColor, message){
    $.smallBox({
      title: boxTitle,
      content: message,
      color: boxColor,
      iconSmall: "fa fa-info",
      timeout: 4000
    });
  }

  //双击用户列表行事件
  public dblClickRow(event){
    this.modalTitle = "编辑用户";
    this.userSaveMode = saveMode.update;
    this.selectedUser = event.data as User;
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
