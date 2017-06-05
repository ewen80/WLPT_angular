import { Component, OnInit, EventEmitter } from '@angular/core';
import { Menu } from "app/core/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";

//菜单保存类型
enum MenuSaveType{
    addRootMenu,
    addChildMenu,
    modMenu
}

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
    public curSaveMode: {title:string, 
                        saveType:MenuSaveType,
                        buttonTitle:string,
                        selectedNode:any} = {title: this.ADD_ROOT_MENU_TITLE, 
                                                saveType: MenuSaveType.addRootMenu,
                                                buttonTitle: this.ADD_BUTTON_TITLE,
                                                selectedNode:null} ; //当前菜单保存类型
 
    constructor(private menuService: MenuService) {
      
    }

    ngOnInit(): void {
        //读取菜单数据
        this.menuService.getAll()
            .then( response => {
                this.nodes = response;
                console.log(this.nodes);
                });
    }

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
            console.log(this.curSaveMode);
        }
    }

    addChildMenu(event){
        this.curSaveMode = {title: this.ADD_CHILD_MENU_TITLE, 
                            saveType: MenuSaveType.addChildMenu,
                            buttonTitle: this.ADD_BUTTON_TITLE,
                            selectedNode: event.node.data};
        //阻止事件冒泡，触发tree deactivate事件
        event.stopPropagation();

        console.log(this.curSaveMode);

    }
}