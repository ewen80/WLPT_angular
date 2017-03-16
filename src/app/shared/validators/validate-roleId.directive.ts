import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

import { RoleService } from '../../core/role/role.service';

/*
    自定义角色Id验证指令，角色Id不能重复
*/
function validateRoleIdFactory(roleId: string,roleService: RoleService){
    return new Promise( resolve => {
         if(roleId){
           roleService.getRole(roleId).then( role => {
               if(role){
                   resolve( {'roleExist': true});
               }
               else{
                   resolve(null);
               }
           });
       }else{
           resolve( {'roleIdEmpty': true});
       }
    })
}

@Directive({
    selector:'[validateRoleId]',
    providers:[
        { provide: NG_ASYNC_VALIDATORS, useExisting: RoleidValidator, multi: true}
    ]
})
export class RoleidValidator implements Validator{
    constructor(private roleService: RoleService){
    }

    validate(control: AbstractControl): Promise<{[key: string]: any}> {
        return validateRoleIdFactory(control.value, this.roleService);
    }
}