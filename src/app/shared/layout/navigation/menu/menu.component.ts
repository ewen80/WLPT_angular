import { Component, Input } from "@angular/core";

import { Menu } from "app/core/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";


@Component({
    selector: 'WLPT-Menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent {
        
    //菜单数据源json格式
    @Input() nodes: Menu[];

    // leafEvent(){
    //     console.log("received event");
    // }
}