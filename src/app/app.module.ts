import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";


import { SmartadminModule } from './shared/smartadmin.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CoreModule } from "./core/core.module";

import {
  ModalModule, ButtonsModule, TooltipModule, DropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ng2-bootstrap'

// import { AdminModule } from './+admin/admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    routing,
    CoreModule,

    //开始引入所有的ng2-bootstrap模块
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    DropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    //结束引入

    SmartadminModule.forRoot(), //系统所有用到的模块及provider
    // ModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
