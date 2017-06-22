
import { Directive, Input, Output, EventEmitter } from "@angular/core";

import { MenuRenderService } from "app/shared/layout/navigation/menu/menu-render.service";

@Directive({
    selector: '[wlptMenuIsLeaf]',
})
export class IsLeafMenuDirective {

    //叶子节点View初始化完成事件
    @Output() onLeafMenuViewInit = new EventEmitter();

    @Input()
    set wlptMenuIsLeaf(isLeaf:boolean){
        if(isLeaf){
            //发送事件
            // this.onLeafMenuViewInit.emit();
            //通过服务发出通知
            this.menuRenderService.foundLeafMenu();
            // console.log('emit found menu leaf event');
        }
    }

    constructor(private menuRenderService: MenuRenderService){}
}