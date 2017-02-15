export class User{
    private _id:string;
    private _name: string;
    private _password: string;
    public _picture?: string;

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get password(){
        return this._password;
    }

    get picture(){
        return this._picture;
    }

    set id(value:string){
        this._id = value;
    }

    set name(value:string){
        this._name = value;
    }

    set password(value:string){
        this._password = value;
    }
    
    set picture(value:string){
        this._picture = value;
    }

    clone():User{
        let user = new User();
        user.id = this._id;
        user.name = this._name;
        user.password = this._password;
        user.picture = this._picture;

        return user;
    }
}