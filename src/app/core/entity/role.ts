export class Role{
    private _id:string;
    private _name: string;


    get id(){
        return this._id;
    }
    set id(value:string){
        this._id = value;
    }

    get name(){
        return this._name;
    }
    set name(value:string){
        this._name = value;
    }

    clone():Role{
        let role = new Role();
        role.id = this._id;
        role.name = this._name;

        return role;
    }
}