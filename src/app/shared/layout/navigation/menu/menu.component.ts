import { Component, Input, AfterViewInit, ElementRef, ViewChild, AfterViewChecked } from "@angular/core";

import { Menu } from "app/core/entity/resources/menu";
import { MenuService } from "app/core/services/resources/menu.service";

declare var $:any;

@Component({
  selector: 'my-child-view',
  template: '<input>'
})
export class ChildViewComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        console.log('child view init');
    }
    name = "aaaaa";
}

//////////////////////////////////////////////

@Component({
    selector: 'WLPT-Menu',
    templateUrl: './menu.component.html',
    // template: `
    //     <ul #menu>  
           
    //             <my-child-view></my-child-view>

    //     </ul>
    // `
})
export class MenuComponent implements AfterViewChecked {
        
    @ViewChild('menu') viewChild;

    //菜单数据源json格式
    @Input() nodes: Menu[];

    ngAfterViewChecked(): void {
        console.log(this.menu);
        // this.$menu.find('li:has(> wlpt-menu)').each((i, li)=> {
        //     let $menuItem = $(li);
        //     console.log("found children li")
        //     console.log($menuItem);
        //     let $a = $menuItem.find('>a');
        //     console.log('found a');
        //     console.log($a);
        //     let sign = $('<b class="collapse-sign"><em class="fa fa-plus-square-o"/></b>');
        //     $a.on('click', (e)=> {
        //         // this.toggle($menuItem);
        //         e.stopPropagation();
        //         return false;
        //     }).append(sign);
        // });
    }

    constructor(private menu:ElementRef){
    }
}