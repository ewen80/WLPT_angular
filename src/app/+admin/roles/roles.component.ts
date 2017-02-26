import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { RoleService } from '../../core/role/role.service';
import { saveMode } from '../../enums';
import { Role } from '../../core/entity/role';


declare var $: any;

@Component({
  selector: 'rolesadmin',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit,  AfterViewInit{

  public roleSaveMode = saveMode;//对话框保存模式（更新，新增)

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  @ViewChild("roleDetailModal") private roleDetailModal;
  @ViewChild("roleDetail") private roleDetail;
  
  public modalTitle: string;
  public delRolesButtonDisabled = true;

  private startRow = 0;


  constructor(private roleService:RoleService) { 
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
        headerName: '角色Id', field: "id"
      },
      {
        headerName: '角色名',  field: "name"
      }
    ];
  }

  ngAfterViewInit(){
    this.setDataSource();
  }

   //角色列表数据源
  setDataSource(){
    let dataSource = {
      getRows:(params: any) => {
        let pageIndex = Math.floor(params.startRow / this.gridOptions.paginationPageSize);
        this.roleService.getRolesWithPage(pageIndex,this.gridOptions.paginationPageSize)
          .then( data => {
            params.successCallback(data.rows, data.rowCount);
          });
          this.startRow = params.startRow;
      }
                  
    }
    this.gridOptions.api.setDatasource(dataSource);
  } 

  public addRoleModalShow():void{
    this.modalTitle = "添加角色";
    this.roleDetail.saveMode = saveMode.add;
    this.roleDetail.Reset();
    this.roleDetail.role = new Role();
    this.roleDetailModal.show();
  }

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    this.roleDetailModal.hide();
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
    if(this.roleDetail){
      this.roleDetail.Reset();
    }
    //刷新角色列表
    this.refreshRoleList();
  }

  //双击角色列表行事件
  public dblClickRow(event){
    this.modalTitle = "编辑用户";
    this.roleDetail.saveMode = saveMode.update;
    this.roleDetail.role = event.data as Role;
    this.roleDetailModal.show();
  }

  //单击删除按钮
  public deleteButtonClick(){
    var selectedRows = this.gridOptions.api.getSelectedRows();
    if(confirm("确认删除选中的"+selectedRows.length.toString()+"条记录吗？")){
      this.roleService.deleteRoles(selectedRows).then(() => {
                                                              this.refreshRoleList();
                                                            });
    }
  }

  //刷新角色列表
  private refreshRoleList(){
    this.setDataSource();
  }

  setDelButtonStatus(){
    if(this.gridOptions.api.getSelectedRows().length > 0){
      this.delRolesButtonDisabled = false;
    }else{
      this.delRolesButtonDisabled = true;
    }
    
  }
}
