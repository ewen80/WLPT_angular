/**
 * 权限类
 */
import { ResourceRange } from "app/core/entity/resource-range";
import { Permission } from "app/core/entity/permission";

export class PermissionWrapper {
    resourceRangeId: number;
    permissions: Permission[] = [];

    constructor(resourceRangeId: number, permissions: Permission[]){
        this.resourceRangeId = resourceRangeId;
        this.permissions = permissions;
    }
}