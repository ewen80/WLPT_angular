
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class MenuRenderService{

    private foundLeaf = new Subject();
    public foundLeaf$ = this.foundLeaf.asObservable();

    constructor(){
        console.log('MenuRenderService created');
    }
    //找到一个叶子节点
    foundLeafMenu(){
        this.foundLeaf.next();
    }
}