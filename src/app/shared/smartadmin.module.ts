import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


/*
import {
  ModalModule, ButtonsModule, TooltipModule, DropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ng2-bootstrap'
*/

import {PopoverModule} from "ng2-popover/src/index";
import {JsonApiService} from './api'
import {LayoutService} from './layout/layout.service'
import {SmartadminLayoutModule} from './layout'
import {I18nModule} from "./i18n/i18n.module";
import {UserModule} from "./user/user.module";
import {SmartadminWidgetsModule} from "./widgets/smartadmin-widgets.module";
import {UtilsModule} from "./utils/utils.module";
// import {ChatModule} from "./chat/chat.module";
// import {StatsModule} from "./stats/stats.module";
// import {InlineGraphsModule} from "./graphs/inline/inline-graphs.module";
// import {SmartadminFormsLiteModule} from "./forms/smartadmin-forms-lite.module";
// import {SmartProgressbarModule} from "./ui/smart-progressbar/smart-progressbar.module";
//import { SmartadminDatatableModule } from './ui/datatable/smartadmin-datatable.module';

// ag-grid
import {AgGridModule} from "ag-grid-ng2/main";

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule,
    //HttpModule,
    AgGridModule.withComponents([]),
    UserModule
  ],
  declarations: [],
  exports: [
    CommonModule, FormsModule, RouterModule,
    //HttpModule,

    PopoverModule,
    SmartadminLayoutModule,
    I18nModule,
    UtilsModule,
    SmartadminWidgetsModule,
    AgGridModule,
    UserModule


    // ModalModule,
    // ButtonsModule,
    // TooltipModule,
    // DropdownModule,
    // ProgressbarModule,
    // AlertModule,
    // TabsModule,
    // AccordionModule,
    // CarouselModule,
    // SmartadminFormsLiteModule,
    // SmartProgressbarModule,
    // InlineGraphsModule,
    // ChatModule,
    // StatsModule,
    //SmartadminDatatableModule
  ]

})

export class SmartadminModule {
  static forRoot():ModuleWithProviders {
    return {
      ngModule: SmartadminModule,
      providers: [JsonApiService, LayoutService]
    };
  }

}
