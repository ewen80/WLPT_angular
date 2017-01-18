import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

import { UserService } from '../../core/user/user.service';

function validateUseridFactory(userService: UserService): ValidatorFn{
    let user: any;

    return (c: AbstractControl) : {[key: string]: any} => {
       if(c && c.value ){
           userService.getUserInfo(c.value).then( (user) => this.user = user);
       }
       return  this.user ? {'userExist': true} : null;
   }
}

@Directive({
    selector:'[validateUserid]',
    providers:[
        { provide: NG_VALIDATORS, useExisting: UseridValidator, multi: true}
    ]
})
export class UseridValidator implements Validator{
    // @Input() userid: string;
    private valFn = Validators.nullValidator;

    constructor(UserService: UserService){
        console.log('UseridValidator Created');
        this.valFn = validateUseridFactory(UserService);
    }

    // ngOnChanges(changes: SimpleChanges): void{
    //     console.log('UseridValidator Changed');
    //     // const change = changes['userid'];
    //     // if(change){
    //     //     const val: string | RegExp = change.currentValue;
    //     //     const re = val instanceof RegExp ? val: new RegExp(val, 'i');
    //     //     this.valFn = validateUserid(this.userid);
    //     // } 
    // }

    validate(control: AbstractControl): {[key: string]: any}{
        return this.valFn(control);
    }
}