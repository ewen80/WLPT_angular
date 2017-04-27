/**
 * 资源范围实体
 */
import { PermissionType } from "app/core/enums";

export class ResourceRange {
    id:number; //主键
    resource:string;
    filter:string;
    roleId:string;
    matchAll:boolean = false;
}