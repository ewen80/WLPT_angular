
export class Menu {
    id?: number;
    name: string;
    path: string;
    iconClass: string;
    orderId?: number = 0;
    children?: Menu[];
    parentId?: number = 0; 
}