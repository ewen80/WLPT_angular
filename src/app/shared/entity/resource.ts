/**
 * 资源类型
 */
export class Resource{
    id?: number; //资源id
    className:string;
    name:string;
    description:string;
    deleted:boolean = false;
}