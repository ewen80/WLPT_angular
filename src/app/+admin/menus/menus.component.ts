import { Component, OnInit } from '@angular/core';
import { Menu } from "app/core/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";

@Component({
    templateUrl: './menus.component.html'
})
export class MenusComponent implements OnInit {
    public nodes: Menu[];

    constructor(private menuService: MenuService) {
      
    }

    ngOnInit(): void {
      //读取菜单数据
      this.menuService.getAll()
        .then( response => this.nodes = response);
    }
}