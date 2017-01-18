import { NgModule } from "@angular/core";
import { MomentPipe } from "./moment.pipe";
import { TimeDirective } from "./time.directive";
import { FieldFilterPipe } from './field-filter.pipe';
import { UseridValidator } from './validate-userid.directive';

@NgModule({
  declarations: [MomentPipe, TimeDirective, FieldFilterPipe, UseridValidator],
  exports: [MomentPipe, TimeDirective, FieldFilterPipe, UseridValidator]
})
export class UtilsModule{}
