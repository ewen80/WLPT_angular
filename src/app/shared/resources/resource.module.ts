import { NgModule, ModuleWithProviders  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule  } from "@angular/forms";

import { SmartadminWidgetsModule } from '../widgets/smartadmin-widgets.module';

import { ResourceDetailComponent } from './resourcedetail/resource-detail.component';
import { ResourceRangeDetailComponent } from './resource-range-detail/resource-range-detail.component';

@NgModule({
    imports:[
        CommonModule, ReactiveFormsModule, SmartadminWidgetsModule
    ],
    declarations: [
        ResourceDetailComponent,
        ResourceRangeDetailComponent
    ],
    exports:[ 
        ResourceDetailComponent,
        ResourceRangeDetailComponent
    ]
})
export class ResourceModule{}