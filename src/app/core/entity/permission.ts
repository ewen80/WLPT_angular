/**
 * 权限类
 */
import { PermissionType } from "app/core/enums";

export class Permission {
    resourceRangeId: number;
    roleId: string;
    permissions: PermissionType[] = [];
}