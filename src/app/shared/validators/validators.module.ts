import { NgModule } from "@angular/core";

import { UseridValidatorDirective } from './directives/validate-userid.directive';
import { RoleidValidator } from './directives/validate-roleId.directive';

@NgModule({
    imports:[],
    declarations:[],
    exports:[UseridValidatorDirective]
})
export class ValidatorsModule{}