/**
 * 权限包装DTO
 */
import { ResourceRange } from "app/shared/entity/resource-range";
import { Permission } from "app/shared/entity/permission";

export class PermissionWrapperDTO {
    resourceRangeId: number;
    permissions: Permission[] = [];

    constructor(resourceRangeId: number, permissions: Permission[]){
        this.resourceRangeId = resourceRangeId;
        this.permissions = permissions;
    }
}