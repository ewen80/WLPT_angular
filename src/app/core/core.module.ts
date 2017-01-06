/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from "@angular/http";

import { UserModule } from './user/user.module';
import { fakeBackendProvider } from "../test/_service/fake_backend";

@NgModule({
    imports: [
        UserModule
    ],
    declarations: [],
     exports: [
        // UserModule
    ],
    providers: [
        MockBackend,  
        BaseRequestOptions,
        fakeBackendProvider     //提供自定义模拟后台功能服务
    ]
})
export class CoreModule{
}