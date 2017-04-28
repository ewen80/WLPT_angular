
import { PermissionType } from "app/core/enums";


export class Permission {
    mask: PermissionType;

    constructor(mask:PermissionType){
        this.mask = mask;
    }
}