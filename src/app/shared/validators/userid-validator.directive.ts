import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

import { UserService } from '../../core/services/user.service';

/**
 * useridValidator工厂函数 
 * The async validator needs to return a promise that in turn returns null if valid or something else if not valid.
 * http://www.carlrippon.com/?p=564
*/
export function validateUseridFactory(userid: string,userService: UserService):Promise<{[key:string]:any}>{
    return new Promise( resolve => {
         if(userid){
           userService.getUser(userid).then( user => {
               if(user){
                   resolve( {'userExist': true});
               }
               else{
                   resolve(null);
               }
           });
         }
    })
}


@Directive({
    selector:'[validateUserid]',
    providers:[
        { provide: NG_ASYNC_VALIDATORS, useExisting: UseridValidatorDirective, multi: true}
    ]
})
export class UseridValidatorDirective implements Validator{
    constructor(private userService: UserService){
    }

    validate(control: AbstractControl): Promise<{[key: string]: any}> {
        return validateUseridFactory(control.value, this.userService);
    }
}