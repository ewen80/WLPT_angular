import { Component, Input, OnInit } from "@angular/core";

import { Menu } from "app/core/entity/resources/menu";

@Component({
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    //菜单数据源json格式
    @Input() dataSource: Menu[];

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    private loadMenus(){
        
    }

}