/**
 * created by wen in 2017/3/16
 * 用户id验证器，判断用户id是否重复
 */
import { AbstractControl } from '@angular/forms';

import { UserService } from '../../core/user/user.service';
import { validateUseridFactory } from './userid-validator.directive';

export class UseridValidator{

    constructor(private userService: UserService){

    }

    validate(control: AbstractControl): Promise<{[key:string]:any}>{
        return validateUseridFactory(control.value, this.userService);
    }
}