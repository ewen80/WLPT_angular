/**
 * 权限包装类
 */
import { ResourceRange } from "app/core/entity/resource-range";
import { Permission } from "app/core/entity/permission";

export class PermissionWrapper {
    resourceRange: ResourceRange;
    permissions: Permission[] = [];

    constructor(resourceRange: ResourceRange, permissions: Permission[]){
        this.resourceRange = resourceRange;
        this.permissions = permissions;
    }

}