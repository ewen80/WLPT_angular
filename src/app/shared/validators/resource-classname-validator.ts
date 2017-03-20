/**
 * created by wen in 2017/3/16
 * 资源类型验证器，判断name是否重复
 */
import { AbstractControl } from '@angular/forms';

import { ResourceService } from '../../core/services/resource.service';

function validateResourceClassNameFactory(className: string,resourceService: ResourceService):Promise<{[key:string]:any}>{
    return new Promise( resolve => {
         if(className){
           resourceService.getResource(className).then( resource => {
               if(resource){
                   resolve( {'resourceExist': true});
               }else{
                   resolve(null);
               }
           });
         }
    })
}

export class ResourceClassNameValidator{

    constructor(private resourceService: ResourceService){

    }

    validate(control: AbstractControl): Promise<{[key:string]:any}>{
        return validateResourceClassNameFactory(control.value, this.resourceService);
    }
}