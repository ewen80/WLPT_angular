import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, FormControl, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

function validateUserid(c: FormControl){
    return c.value.indexOf('test') > 0 ? {'forbiddenName': c.value} : null;
}

@Directive({
    selector:'[validateUserid]',
    providers:[
        { provide: NG_VALIDATORS, useValue: validateUserid, multi: true}
    ]
})
export class UseridValidator implements Validator{
    @Input() userid: string;
    private valFn = Validators.nullValidator;

    constructor(){
        console.log('UseridValidator Created');
    }

    // ngOnChanges(changes: SimpleChanges): void{
    //     const change = changes['userid'];
    //     if(change){
    //         const val: string | RegExp = change.currentValue;
    //         const re = val instanceof RegExp ? val: new RegExp(val, 'i');
    //         this.valFn = validateUserid(this.userid);
    //     } 
    // }

    validate(control: AbstractControl): {[key: string]: any}{
        // console.log('i am userid-validator:' + this.userid);
        // return validateUserid(this.userid);
        return {ttt:true};
    }
}