import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

import { RoleService } from '../../core/role/role.service';

/*
    自定义角色名验证指令，角色名不能重复
*/
function validateRoleNameFactory(roleName: string,roleService: RoleService){
    return new Promise( resolve => {
         if(roleName){
           roleService.getRole(roleid).then( role => {
               if(role){
                   resolve( {'roleExist': true});
               }
               else{
                   resolve(null);
               }
           });
       }else{
           resolve( {'roleidEmpty': true});
       }
    })
}

@Directive({
    selector:'[validateRoleid]',
    providers:[
        { provide: NG_ASYNC_VALIDATORS, useExisting: RoleidValidator, multi: true}
    ]
})
export class RoleidValidator implements Validator{
    constructor(private roleService: RoleService){
    }

    validate(control: AbstractControl): Promise<{[key: string]: any}> {
        return validateRoleidFactory(control.value, this.roleService);
    }
}