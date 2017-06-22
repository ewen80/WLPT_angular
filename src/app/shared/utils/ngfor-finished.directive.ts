
import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
    selector: '[ngForIsFinished]'
})
export class NgForIsFinishedDirective{

    @Input()
    set ngForIsFinished(isFinished: boolean){
        if(isFinished){
            //do something
            // console.log(this.el);
            // console.log("ngfor is finished");
        }
    }
}