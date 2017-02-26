export class Role{
    public id:string;
    public name: string;

    clone():Role{
        let role = new Role();
        role.id = this.id;
        role.name = this.name;
        return role;
    }
}