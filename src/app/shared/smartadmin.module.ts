import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { PopoverModule } from "ngx-popover";
import { JsonApiService } from './api'
import { LayoutService } from './layout/layout.service'
import { SmartadminLayoutModule } from './layout'
import { I18nModule } from "./i18n/i18n.module";
import { UserModule } from "./user/user.module";
import { SmartadminWidgetsModule } from "./widgets/smartadmin-widgets.module";
import { UtilsModule } from "./utils/utils.module";
// import {VoiceControlModule} from "./voice-control/voice-control.module";
// import {SmartadminFormsModule} from "./forms/smartadmin-forms.module";
// import {ChatModule} from "./chat/chat.module";
// import {StatsModule} from "./stats/stats.module";
// import {InlineGraphsModule} from "./graphs/inline/inline-graphs.module";
// import {SmartadminFormsLiteModule} from "./forms/smartadmin-forms-lite.module";
// import {SmartProgressbarModule} from "./ui/smart-progressbar/smart-progressbar.module";
//import { SmartadminDatatableModule } from './ui/datatable/smartadmin-datatable.module';

import { ResourceModule } from './resources/resource.module';
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
import { AgGridBooleanFilterComponent } from "./ag-grid-filters/boolean-filter.component";

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule,
    //HttpModule,
    AgGridModule.withComponents([
      AgGridBooleanFilterComponent
    ]),
    UserModule,
    ResourceModule,
  ],
  declarations: [
    AgGridBooleanFilterComponent
  ],
  exports: [
    CommonModule, FormsModule, RouterModule,

    PopoverModule,
    SmartadminLayoutModule,
    I18nModule,
    UtilsModule,
    SmartadminWidgetsModule,
    // SmartadminFormsModule
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
    //SmartadminDatatableModule,

    AgGridModule,
    UserModule,
    ResourceModule,

    AgGridBooleanFilterComponent
  ]

})

export class SmartadminModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SmartadminModule,
      providers: [JsonApiService, LayoutService]
    };
  }

}
