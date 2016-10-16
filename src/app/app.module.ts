import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from "@angular/http";

import {SmartadminModule} from './shared/smartadmin.module'
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {UserModule} from "./core/user/user.module";
import {UserService} from "./core/user/user.service";
import { AuthenticationGuard, AuthenticationService } from "./core/user/authentication/index";

import { fakeBackendProvider } from "./test/_service/fake_backend";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,

    routing,
    //TODO:SmartadminModule是sharedModule不应该在app中import，应该在各自子模块中import
    SmartadminModule.forRoot(),  //系统所有用到的模块及provider
    UserModule.forRoot(),         //与用户相关的模块及provider
  ],
  providers: [
    //TODO:考虑UserService和Authentication合并
    UserService,  //用户相关服务，与UserModule.forRoot中导入的UserService重复,此服务应该有更高优先级
    AuthenticationGuard, AuthenticationService,  //用户验证相关providers
    MockBackend,  
    BaseRequestOptions,
    fakeBackendProvider     //提供自定义模拟后台功能服务
    ], 
  bootstrap: [AppComponent]
})
export class AppModule {

}
