/**
 * 资源类型
 */
export class Resource{
    className:string; //主键不可重复
    name:string;
    description:string;
    deleted:boolean = false;
}