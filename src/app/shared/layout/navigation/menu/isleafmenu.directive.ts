
import { Directive, Input, Output, EventEmitter } from "@angular/core";

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
            this.onLeafMenuViewInit.emit();
            console.log('emit found menu leaf event');
        }
    }
}