import { Role } from './role';

export class User{
    public id?: string;
    public userId: string;
    public name: string;
    public password: string;
    public picture?: string;
    public roleId?: string;

    // public clone(user:User){
    //     this.id = user.id;
    //     this.name = user.name;
    //     this.password = user.password;
    //     if(user.picture){
    //         this.picture = user.picture;
    //     }
    //     let role = new Role();
    //     role.clone(user.role);
    //     this.role = role;
    // }
}