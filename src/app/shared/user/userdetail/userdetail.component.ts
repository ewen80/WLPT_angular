import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';



import { UserService } from '../../../core/user/user.service';
import { RoleService } from '../../../core/role/role.service';
import { User } from '../../../core/entity/user';
import { Role } from '../../../core/entity/role';
import { saveMode } from '../../../enums';
import { UseridValidator } from '../../validators/userid-validator';

@Component({
    selector: 'user-detail',
    templateUrl: './userdetail.component.html'
})
export class UserDetailComponent implements OnInit{

    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息
    

    public user: User;
    public allRoles: Array<Role> = [];
    public selectedRole: Role = new Role();

    userDetailForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService){
        this.createForm();
    }



    private createForm():void{
        this.userDetailForm = this.fb.group({
            // When you reference a method you lose the object it's attached on. You can force this using the bind method
            id: ['',,(new UseridValidator(this.userService)).validate.bind(this)],
            name: ['', Validators.required],
        });
        this.userDetailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    //form中字段发生变化
    onValueChanged(data?: any){
        if(!this.userDetailForm) { return; }
        const form = this.userDetailForm;

        for(const field in this.formErrors){
            //清除之前的错误信息
            this.formErrors[field] = '';
            const control = form.get(field);

            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key] + '';
                }
            }
            
        }
        
    }

    formErrors = {
        'id': '',
        'name': ''
    }

    validationMessages = {
        'id': {
            'required': '该字段不能为空',
            'userExist': 'id已经存在'
        },
        'name': {
            'required': '姓名不能为空'
        }
    };

    //重置用户表状态
    public reset(): void{
        
    }

    public refresh(): void{
        
    }

    //改变当前选择角色
    public changeRole(roleId:string){
        
    }

    ngOnInit(){
        this.loadRoles();
    }

    //读取角色信息角色填充选择框
    private loadRoles(){
        this.roleService.getAllRoles()
            .then( response => {
                if(response){
                    this.allRoles = response;                }
            })
    }

    private saveUser(){
        //调用UserService服务添加用户,激活保存完成事件
        this.user.role = this.selectedRole;
        this.userService.saveUser(this.user).
            then(response => {
                if(response){
                    this.onSaveFinished.emit({
                                            saveMode: this.saveMode,
                                            sucess: true, 
                                            message: '保存成功'})
                }else{
                    this.onSaveFinished.emit({
                                            saveMode: this.saveMode,
                                            sucess: false, 
                                            message: '保存失败'})
                }
            })
    }

    onSubmit(){
        // switch(this.saveMode){
        //     case saveMode.add:
        //         this.addUser();
        //         break;
        //     case saveMode.update:
        //         this.updateUser();
        //         break;
        // }
        this.saveUser();
    }
}