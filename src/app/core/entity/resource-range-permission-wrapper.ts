/**
 * 权限类
 */
import { PermissionType } from "app/core/enums";

export class ResourceRangePermissionWrapper {
    resourceRangeId: number;
    permissions: PermissionType[] = [];
}