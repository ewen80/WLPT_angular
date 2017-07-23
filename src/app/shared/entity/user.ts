import { Role } from './role';

export class User{
    public id?: string;
    public userId: string;
    public name: string;
    public password: string;
    public picture?: string;
    public roleId?: string;
    public deleted:boolean=false;
}