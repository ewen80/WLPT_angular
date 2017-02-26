import { NgModule } from "@angular/core";
import { MomentPipe } from "./moment.pipe";
import { TimeDirective } from "./time.directive";
import { FieldFilterPipe } from './field-filter.pipe';
import { UseridValidator } from './validate-userid.directive';
import { RoleidValidator } from './validate-roleId.directive';

@NgModule({
  declarations: [MomentPipe, TimeDirective, FieldFilterPipe, UseridValidator, RoleidValidator],
  exports: [MomentPipe, TimeDirective, FieldFilterPipe, UseridValidator, RoleidValidator]
})
export class UtilsModule{}
