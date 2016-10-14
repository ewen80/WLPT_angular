import {NgModule} from "@angular/core";
import {MomentPipe} from "./moment.pipe";
import {TimeDirective} from "./time.directive";
import { FieldFilterPipe } from './field-filter.pipe';

@NgModule({
  declarations: [MomentPipe, TimeDirective, FieldFilterPipe],
  exports: [MomentPipe, TimeDirective, FieldFilterPipe]
})
export class UtilsModule{}
