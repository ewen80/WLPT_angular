/*
    created by wenliang on 2016-10-15
    核心模块（被appmodule只调用一次的模块）
*/
import { NgModule, ErrorHandler, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, HttpModule, BaseRequestOptions } from "@angular/http";

import {
  ModalModule, ButtonsModule, TooltipModule, BsDropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ng2-bootstrap'

import { fakeBackendProvider } from "../test/_service/fake_backend";
import { AuthenticationGuard, AuthenticationService } from './services/authentication/index';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { ResourceService } from './services/resource.service';
import { ResourceRangeService } from './services/resource-range.service';
import { BasicAuthenticationHttp } from './services/basic-authentication-http.service';

import { AppConfig } from './app.config';
import { AggridFilterSerialization } from "../shared/helper/serialize/aggrid-filter.serialization";

export function initConfig(config: AppConfig){
    return () => config.load();
}

@NgModule({
    imports: [
        HttpModule,

        //开始引入所有的ng2-bootstrap模块
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        CarouselModule.forRoot(),
        //结束引入
    ],
    declarations: [],
    exports: [ ],
    providers: [
        BaseRequestOptions,
        // MockBackend,  
        // fakeBackendProvider,     //提供自定义模拟后台功能服务
        AuthenticationGuard,
        AuthenticationService,
        UserService,
        RoleService,
        ResourceService,
        ResourceRangeService,
        BasicAuthenticationHttp,
        AppConfig,
        AggridFilterSerialization,  //AgGrid组件查询过滤器序列化为字符串
        {
            //初始化配置
            provide: APP_INITIALIZER, useFactory:initConfig, deps: [AppConfig], multi: true
        }
        // {provide:ErrorHandler,useClass:MyErrorHandler}
    ]
})
export class CoreModule{
}