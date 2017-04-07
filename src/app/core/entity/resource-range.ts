/**
 * 资源范围实体
 */
export class ResourceRange {
    id:number; //主键
    resource:string;
    filter:string;
    roleId:string;
    matchAll:boolean;
}