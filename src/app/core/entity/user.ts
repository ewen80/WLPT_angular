import { Role } from './role';

export class User{
    public id:string;
    public name: string;
    public password: string;
    public picture?: string;
    public role: Role = new Role();

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