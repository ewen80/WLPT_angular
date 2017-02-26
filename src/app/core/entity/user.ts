export class User{
    public id:string;
    public name: string;
    public password: string;
    public picture?: string;

    clone():User{
        let user = new User();
        user.id = this.id;
        user.name = this.name;
        user.password = this.password;
        user.picture = this.picture;
        return user;
    }
}