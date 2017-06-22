
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgForIsFinishedDirective } from "app/shared/utils/ngfor-finished.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgForIsFinishedDirective
    ],
    exports: [
        NgForIsFinishedDirective
    ]
})
export class MySharedModule{

}