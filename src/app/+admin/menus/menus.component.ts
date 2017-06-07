import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Menu } from "app/core/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";

//菜单保存类型
enum MenuSaveType{
    addRootMenu,
    addChildMenu,
    modMenu
}

declare var $: any;

@Component({
    templateUrl: './menus.component.html'
})
export class MenusComponent implements OnInit {
    readonly ADD_ROOT_MENU_TITLE = "添加根菜单";
    readonly ADD_CHILD_MENU_TITLE = "添加子菜单";
    readonly MOD_MENU_TITLE = "修改菜单";
    readonly ADD_BUTTON_TITLE = "添加";
    readonly MOD_BUTTON_TITLE = "修改";

    public nodes: Menu[];
    public menuDetailForm: FormGroup;

    public curSaveMode: {title:string, 
                        saveType:MenuSaveType,
                        buttonTitle:string,
                        selectedNode:any} = {title: this.ADD_ROOT_MENU_TITLE, 
                                                saveType: MenuSaveType.addRootMenu,
                                                buttonTitle: this.ADD_BUTTON_TITLE,
                                                selectedNode:null} ; //当前菜单保存类型
    @ViewChild("menuTree") private menuTree;
 
    constructor(private formBuilder: FormBuilder, private menuService: MenuService) {
      this.createForm();
    }

    //构建Form
    private createForm():void{
        this.menuDetailForm = this.formBuilder.group({
            name: ['',Validators.required],
            path: ['', Validators.required] 
        });
    }

    ngOnInit(): void {
        this.loadMenuData();
    }

    //加载菜单数据
    private loadMenuData(){
        //读取菜单数据
        this.menuService.getAll()
            .then( response => this.nodes = response);
    }

    //点击菜单节点
    onTreeClick(event){
        if(event && event.treeModel){
            var treeModel = event.treeModel;
            if(treeModel.activeNodes.length > 0){
                //当前有选中菜单节点
                this.curSaveMode = {title: this.MOD_MENU_TITLE, 
                                    saveType: MenuSaveType.modMenu,
                                    buttonTitle: this.MOD_BUTTON_TITLE,
                                    selectedNode: event.node.data};
            } else {
                //当前没有选中菜单节点
                this.curSaveMode = {title: this.ADD_ROOT_MENU_TITLE,
                                    saveType: MenuSaveType.addRootMenu,
                                    buttonTitle: this.ADD_BUTTON_TITLE,
                                    selectedNode: event.node.data};
            }
        }
    }

    //点击添加子菜单按钮
    addChildMenuClick(nodeData){
        var selectedNode = this.menuTree.treeModel.getNodeById(nodeData.id);
        selectedNode.toggleActivated();
        this.curSaveMode = {title: this.ADD_CHILD_MENU_TITLE, 
                            saveType: MenuSaveType.addChildMenu,
                            buttonTitle: this.ADD_BUTTON_TITLE,
                            selectedNode: nodeData};
        //阻止事件冒泡，触发tree deactivate事件
        event.stopPropagation();
    }

    //点击删除菜单按钮
    delMenuClick(node){
        //判断是否有子菜单，有，提示是否连同子菜单一起删除，无，确认是否删除
        if(node.hasChildren){
            if(confirm('选中的菜单存在子菜单，点击确认将删除本菜单及其所有子菜单，您确认要这么做吗？')){
                //删除菜单及子菜单
                
            }
        } else {
            //删除菜单
            this.menuService.delete(node.data.id);
        }
    }

    //点击菜单保存按钮
    onSubmit(){
        switch(this.curSaveMode.saveType){
            //添加根菜单
            case MenuSaveType.addRootMenu:
                this.addRootMenu();
                break;
            //添加子菜单
            case MenuSaveType.addChildMenu:
                this.addChildMenu();
                break;
        }

        this.loadMenuData();
        this.menuDetailForm.reset();
    }

    //添加根菜单节点
    addRootMenu(){
        var rootMenu: Menu = this.prepareSaveMenu();
        this.menuService.save(rootMenu)
            .then(response => {
                var boxTitle, boxColor;

                if(response){
                    this.showSuccessHint();
                }else{
                    this.showFailureHint();
                }
            });
    }

    //添加子菜单
    addChildMenu(){
        var childMenu: Menu = this.prepareSaveMenu();
        childMenu.parentId = this.curSaveMode.selectedNode.id;

        this.menuService.save(childMenu)
            .then(response => {
                if(response){
                    this.showSuccessHint();
                }else{
                    this.showFailureHint();
                }
            });
    }

    prepareSaveMenu(): Menu{
        const formModel = this.menuDetailForm.value;
        const saveMenu = new Menu();

        saveMenu.name = formModel.name;
        saveMenu.path = formModel.path;
        return saveMenu;
    }

    //弹出提示框
    private showSuccessHint(){
        this.showHint("提示", "#296191", "保存成功");
    }
    private showFailureHint(){
        this.showHint("错误", "##c00", "保存失败");
    }
    private showHint(boxTitle, boxColor, message){
        $.smallBox({
        title: boxTitle,
        content: message,
        color: boxColor,
        iconSmall: "fa fa-info",
        timeout: 4000
        });
    }
}