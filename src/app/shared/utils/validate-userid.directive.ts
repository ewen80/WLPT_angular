import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_ASYNC_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

import { UserService } from '../../core/user/user.service';

function validateUseridFactory(userid: string,userService: UserService){
    return new Promise( resolve => {
         if(userid && userid ){
           userService.getUserInfo(userid).then( user => {
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
        { provide: NG_ASYNC_VALIDATORS, useExisting: UseridValidator, multi: true}
    ]
})
export class UseridValidator implements Validator{
    constructor(private userService: UserService){
    }

    validate(control: AbstractControl): Promise<{[key: string]: any}> {
        return validateUseridFactory(control.value, this.userService);
    }
}