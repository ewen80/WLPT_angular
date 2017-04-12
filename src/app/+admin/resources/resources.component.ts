/*
  created by wenliang
  资源管理页面
*/
import { Component, OnInit, AfterViewInit, ViewChild, Input, EventEmitter } from '@angular/core';

import {GridOptions} from 'ag-grid/main';

import { ResourceService } from '../../core/services/resource.service';
import { Resource } from '../../core/entity/resource';
import { saveMode } from '../../enums';
import { AggridFilterSerialization } from "../../shared/helper/serialize/aggrid-filter.serialization";
import { AgGridBooleanFilterComponent } from "../../shared/ag-grid-filters/boolean-filter.component";
import { ResourceRangeService } from "../../core/services/resource-range.service";
import { ResourceRange } from "../../core/entity/resource-range";
import { RoleService } from "app/core/services/role.service";
import { Role } from "app/core/entity/role";

declare var $: any;

@Component({
  selector: 'resoucesadmin',
  templateUrl: './resources.component.html',
})
export class ResourceComponent implements OnInit,  AfterViewInit{

  public resourceSaveMode: saveMode;//资源类型对话框保存模式（更新，新增)
  public rangeSaveMode: saveMode;//范围对话框保存模式

  public typesGridOptions:GridOptions;
  public rangesGridOptions:GridOptions;
  public typesColumnDefs:any[];
  public rangesColumnDefs:any[];

  @ViewChild("resourceDetailModal") private resourceDetailModal;
  @ViewChild("resourceDetail") private resourceDetail;

  @ViewChild("rangeDetailModal") private rangeDetailModal;
  @ViewChild("rangeDetail") private rangeDetail;

  private resourceDetailModalIsShown:boolean;
  private rangeDetailModalIsShown: boolean;
  
  public resourceModalTitle: string;
  public rangeModalTitle: string;
  public delTypeButtonDisabled = true;
  public rangeButtonDisabled = true;

  public delRangeButtonDisabled = true;

  public addTypeButtonDisplay:boolean = true;
  public delTypeButtonDisplay:boolean = true;
  public rangeButtonDisplay:boolean = true;

  public addRangeButtonDisplay:boolean = true;
  public delRangeButtonDisplay:boolean = true;

  private startRow = 0;

  public rangeRowData:any[];

  public selectedResource: Resource = new Resource();
  public selectedRange: ResourceRange = new ResourceRange();

  public activedTabIndex: number = 0;//当前活动状态的Tab序号

  constructor(private resourceService:ResourceService, 
              private resourceRangeService:ResourceRangeService, 
              private aggridFilterSerialization:AggridFilterSerialization,
              private roleService:RoleService) { 
    // console.log('users.components created:'+userService);
  }

  ngOnInit() {
    //初始化资源类型表格
    this.typesGridOptions = <GridOptions>{
      floatingFilter:false,
      rowSelection:"multiple",
      rowModelType:'pagination',
      paginationPageSize:20,
      enableServerSideFilter: true,
    };

    this.rangesGridOptions = <GridOptions>{
      floatingFilter:false,
      rowSelection:"multiple",
      //range不采用服务器端分页和排序,过滤
      // rowModelType:'pagination',
      // paginationPageSize:20,
      // enableServerSideFilter: true,
    }
    
    this.typesColumnDefs = [
      {
        headerName: '#',
        width:30,
        suppressFilter:true,
        checkboxSelection: true
      },
      {
        headerName: '序号',
        width:50,
        suppressFilter:true,
        cellRenderer: (params:any) => {
          return this.startRow + params.rowIndex + 1;
        } 
      },
      {
        headerName: '资源类型名',  field: "name", filter: 'text', filterParams: {newRowsAction: 'keep'}
      },
      {
        headerName:'类全限定名', field: "className",filter: 'text', filterParams: {newRowsAction: 'keep'}
      },
      {
        headerName:'描述', field: "description",suppressFilter:true
      },
      {
        headerName: '已删除', field: 'deleted',filter: 'text', filterParams: {newRowsAction: 'keep'},
        cellRenderer: (params:any) => {
          return params.data.deleted ? '是':'否';
        },
        filterFramework: AgGridBooleanFilterComponent,
      },
    ];

    this.rangesColumnDefs = [
      {
        headerName: '#',
        width:30,
        suppressFilter:true,
        checkboxSelection: true
      },
      {
        headerName: '序号',
        width:50,
        suppressFilter:true,
        cellRenderer: (params:any) => {
          return this.startRow + params.rowIndex + 1;
                      }
      },
      {
        headerName: '过滤器',
        width:100,
        suppressFilter:true,
        field: 'filter'
      },
      {
        headerName: '角色id',
        suppressFilter:true,
        field: 'roleId'
      },
      // {
      //   headerName: '角色名',
      //   suppressFilter:true,
      //   field: 'roleName'
      // },
      {
        headerName: '匹配全部',
        width:100,
        suppressFilter:true,
        cellRenderer: (params: any) => {
          return params.data.matchAll ? '是':'否';
        }
      }
    ];
  }

  ngAfterViewInit(){
    this.setTypesDataSource();
    // this.setRangesDataSource();

    this.checkButtonsDisplay();
  }

   //资源类型数据源
  setTypesDataSource(){
    let dataSource = {
      getRows:(params: any) => {
        let pageIndex = Math.floor(params.startRow / this.typesGridOptions.paginationPageSize);
        this.aggridFilterSerialization.filterModel = params.filterModel;
        this.resourceService.getResourcesWithPage(pageIndex,this.typesGridOptions.paginationPageSize,this.aggridFilterSerialization)
          .then( data => {
            params.successCallback(data.rows, data.rowCount);
          });
          this.startRow = params.startRow;
      }
                  
    }
    this.typesGridOptions.api.setDatasource(dataSource);
  } 

  //资源范围数据源
  setRangesDataSource(className:string){
        var allRole: Role[];
        this.roleService.getAllRoles()
          .then( response => {
            allRole = response;
            this.rangeRowData = new Array<any>();
            this.resourceRangeService.getByClassName(className)
              .then( data => {
                let rangeData = new Array<any>();
                data.rows.map( range => {
                  rangeData.push({
                    id: range.id,
                    filter: range.filter,
                    roleId: range.roleId,
                    // roleName: allRole.find( value => value.id === range.roleId).name,
                    resource: range.resourceTypeClassName,
                    matchAll: range.matchAll
                  })
                });
                this.rangeRowData = rangeData;
              });
          });
  }

  //保存结束
  public saveFinished(event:any){
    //关闭对话框
    if(this.resourceDetailModalIsShown){
      this.resourceDetailModal.hide();
      //重置对话框
      if(this.resourceDetail){
        this.resourceDetail.reset(new Resource());
      }
      //刷新列表
      this.refreshResourceList();
    }

    if(this.rangeDetailModalIsShown){
      this.rangeDetailModal.hide();
      //重置对话框
      if(this.rangeDetail){
        this.rangeDetail.reset(new ResourceRange());
      }
      //刷新列表
      this.refreshRangeList(this.selectedResource.className);
    }
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
  }

  //新增资源
  public addResourceModalShow():void{
    this.resourceModalTitle = "添加资源类型";
    this.resourceSaveMode = saveMode.add;
    this.selectedResource = new Resource();
    this.resourceDetailModal.show();
    this.resourceDetailModalIsShown = true;
  }

  //新增范围
  public addRangeModalShow():void{
    this.rangeModalTitle = "添加资源范围";
    this.rangeSaveMode = saveMode.add;
    if(this.selectedResource){
      this.selectedRange = new ResourceRange();
      this.selectedRange.resource = this.selectedResource.className;
      this.rangeDetailModal.show();
      this.rangeDetailModalIsShown = true;
    }else{
      console.error("还没有选中的资源类型,无法添加资源范围");
      return;
    }
  }

  //双击资源行事件
  public dblClickTypesRow(event){
    this.resourceModalTitle = "编辑资源类型";
    this.resourceSaveMode = saveMode.update;
    this.selectedResource = event.data as Resource;
    this.resourceDetailModal.show();
    this.resourceDetailModalIsShown = true;
  }

  //双击范围行事件
  public dblClickRangesRow(event){
    this.rangeModalTitle = "编辑资源范围";
    this.rangeSaveMode = saveMode.update;
    this.selectedRange = event.data as ResourceRange;
    this.rangeDetailModal.show();
    this.rangeDetailModalIsShown = true;
  }

  //单击资源删除按钮
  public deleteResourceButtonClick(){
    var selectedRows = this.typesGridOptions.api.getSelectedRows();
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

  //单击范围删除按钮
  public deleteRangeButtonClick(){
    var selectedRows = this.rangesGridOptions.api.getSelectedRows();
    if(confirm("确认删除选中的"+selectedRows.length.toString()+"条记录吗？")){
      this.resourceRangeService.delete(selectedRows)
        .then(() => this.refreshRangeList(this.selectedResource.className))
        .catch((reason) => $.SmartMessageBox({
					title : "出现错误",
					content : JSON.parse(reason.text()).message,
          buttons : "[OK]",
				}));
    }
  }

  //单击范围管理按钮
  public rangeButtonClick(){
    var selectedRows = this.typesGridOptions.api.getSelectedRows();
    if(selectedRows.length > 1){
      console.error("每次只能管理一个资源类型的资源范围！请选择一个资源类型，不要多选！");
      return;
    }else{
      this.selectedResource = selectedRows[0];
      this.setRangesDataSource(this.selectedResource.className);
      this.activedTabIndex = 1;
      this.checkButtonsDisplay();
    }
  }

  //刷新资源类型列表
  private refreshResourceList(){
    this.setTypesDataSource();
  }
  //刷新资源范围列表
  private refreshRangeList(resourceClassName:string){
    this.setRangesDataSource(resourceClassName);
  }

  //设置工具栏按钮状态
  setTypesButtonsStatus(){
    this.delTypeButtonDisabled = this.typesGridOptions.api.getSelectedRows().length == 0;
    this.rangeButtonDisabled = this.typesGridOptions.api.getSelectedRows().length != 1;
  }
  setRangesButtonsStatus(){
    this.delRangeButtonDisabled = this.rangesGridOptions.api.getSelectedRows().length == 0;
  }

  onTabSelected(selectedTabIndex:number){
    this.activedTabIndex = selectedTabIndex;
    this.checkButtonsDisplay();
  }

  //检查工具栏按钮是否需要显示
  checkButtonsDisplay(){
    //当前如果是资源范围管理tab则隐藏 "添加资源类型,删除资源类型,资源范围管理" 按钮
    switch(this.activedTabIndex){
      case 0:
        //资源类型管理Tab
        this.addTypeButtonDisplay = true;
        this.delTypeButtonDisplay = true;
        this.rangeButtonDisplay = true;

        this.addRangeButtonDisplay = false;
        this.delRangeButtonDisplay = false;
        break;
      case 1:
        //资源范围管理Tab
        this.addTypeButtonDisplay = false;
        this.delTypeButtonDisplay = false;
        this.rangeButtonDisplay = false;

        this.addRangeButtonDisplay = true;
        this.delRangeButtonDisplay = true;
        break;
    }
  }
}
