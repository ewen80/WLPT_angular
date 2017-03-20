/**
 * created by wen in 2017/3/16
 * 资源类型验证器，判断name是否重复
 */
import { AbstractControl } from '@angular/forms';

import { ResourceListService } from '../../core/services/resourcelist.service';

function validateResourceTypeNameFactory(resourceName: string,resourceListService: ResourceListService):Promise<{[key:string]:any}>{
    return new Promise( resolve => {
         if(resourceName){
           resourceListService.getResourceTypesByName(resourceName).then( resourceTypes => {
               if(resourceTypes){
                   resolve( {'resourceTypeExist': true});
               }else{
                   resolve(null);
               }
           });
         }
    })
}

export class ResourceTypeNameValidator{

    constructor(private resourceListService: ResourceListService){

    }

    validate(control: AbstractControl): Promise<{[key:string]:any}>{
        return validateResourceTypeNameFactory(control.value, this.resourceListService);
    }
}