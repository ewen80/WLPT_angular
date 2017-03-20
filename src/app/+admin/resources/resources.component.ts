
/*
  created by wenliang
  资源管理页面
*/
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { ResourceService } from '../../core/services/resource.service';
import { Resource } from '../../core/entity/resource';
import { saveMode } from '../../enums';

declare var $: any;

@Component({
  selector: 'resoucesadmin',
  templateUrl: './resources.component.html'
})
export class ResourceComponent implements OnInit,  AfterViewInit{

  public saveMode = saveMode;//对话框保存模式（更新，新增)

  public gridOptions:GridOptions;
  public columnDefs:any[];
  public rowData:any[];

  @ViewChild("resourceDetailModal") private resourceDetailModal;
  @ViewChild("resourceDetail") private resourceDetail;
  
  public modalTitle: string;
  public delButtonDisabled = true;

  private startRow = 0;


  constructor(private resourceService:ResourceService) { 
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
        headerName: '资源类型名',  field: "name"
      },
      {
        headerName:'类全限定名', field: "className"
      },
      {
        headerName:'描述', field: "description"
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
        this.resourceService.getResourceListWithPage(pageIndex,this.gridOptions.paginationPageSize)
          .then( data => {
            params.successCallback(data.rows, data.rowCount);
          });
          this.startRow = params.startRow;
      }
                  
    }
    this.gridOptions.api.setDatasource(dataSource);
  } 

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    this.resourceDetailModal.hide();
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
    if(this.resourceDetail){
      this.resourceDetail.reset(new Resource());
    }
    //刷新列表
    this.refreshResourceList();
  }

  //新增资源
  public addResourceModalShow():void{
    this.modalTitle = "添加资源类型";
    this.resourceDetail.saveMode = saveMode.add;
    this.resourceDetailModal.show();
  }

  //双击角色列表行事件
  public dblClickRow(event){
    this.modalTitle = "编辑资源类型";
    this.resourceDetail.saveMode = saveMode.update;
    this.resourceDetail.resourceType = event.data as Resource;
    this.resourceDetailModal.show();
  }

  //单击删除按钮
  public deleteButtonClick(){
    var selectedRows = this.gridOptions.api.getSelectedRows();
    if(confirm("确认删除选中的"+selectedRows.length.toString()+"条记录吗？")){
      this.resourceService.delete(selectedRows)
        .then(() => this.refreshResourceList())
        .catch((reason) => $.SmartMessageBox({
					title : "出现错误",
					content : JSON.parse(reason.text()).message,
          buttons : "[OK]",
				}));
    }
  }

  //刷新角色列表
  private refreshResourceList(){
    this.setDataSource();
  }

  setDelButtonStatus(){
    if(this.gridOptions.api.getSelectedRows().length > 0){
      this.delButtonDisabled = false;
    }else{
      this.delButtonDisabled = true;
    }
    
  }
}
