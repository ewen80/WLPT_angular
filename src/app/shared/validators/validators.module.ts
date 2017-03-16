import { NgModule } from "@angular/core";

import { UseridValidatorDirective } from './userid-validator.directive';
import { UseridValidator } from './userid-validator';
import { RoleidValidator } from './validate-roleId.directive';

@NgModule({
    imports:[],
    declarations:[],
    exports:[UseridValidatorDirective, UseridValidator],
})
export class ValidatorsModule{}