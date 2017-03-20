import { NgModule, ModuleWithProviders  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule  } from "@angular/forms";

import { SmartadminWidgetsModule } from '../../widgets/smartadmin-widgets.module';

import { ResourceDetailComponent } from './resourcedetail.component';


@NgModule({
    imports:[
        CommonModule, ReactiveFormsModule, SmartadminWidgetsModule
    ],
    declarations: [
        ResourceDetailComponent
    ],
    exports:[ ResourceDetailComponent]
})
export class ResourceModule{}