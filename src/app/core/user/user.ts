export class User{
    id:string;
    name: string;
    password: string;
    picture: string;

    clone():User{
        let user = new User();
        user.id = this.id;
        user.name = this.name;
        user.password = this.password;
        user.picture = this.picture;

        return user;
    }
}