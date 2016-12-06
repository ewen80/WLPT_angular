/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule } from '@angular/core';


import { UserModule } from './user/user.module';

@NgModule({
    imports: [
        UserModule
    ],
    declarations: [],
    exports: [
        UserModule
    ],
    providers: []
})
export class CoreModule{
}