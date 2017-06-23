import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';



import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { User } from 'app/shared/entity/user';
import { Role } from 'app/shared/entity/role';
import { saveMode } from '../../../core/enums';
import { UseridValidator } from '../../validators/userid-validator';

@Component({
    selector: 'user-detail',
    templateUrl: './userdetail.component.html'
})
export class UserDetailComponent implements OnInit, OnChanges {
    @Input() user: User;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息
    
    public allRoles: Array<Role> = [];
    public selectedRole: Role;

    public userDetailForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService){
        this.createForm();
    }

    private createForm():void{
        this.userDetailForm = this.fb.group({
            // When you reference a method you lose the object it's attached on. You can force this using the bind method
            id: ['',Validators.required,(new UseridValidator(this.userService)).validate.bind(this)],
            name: ['', Validators.required],
            password: ['', Validators.required],
            roleId: ['', Validators.required]
        });
        this.userDetailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.userDetailForm.statusChanges.subscribe(status => this.onValidatorStatusChanged(status));
        
    }

    //验证器验证状态改变
    onValidatorStatusChanged(status){
        this.validateControl();
    }

    //form中字段发生变化
    onValueChanged(data?: any){
        this.validateControl();
    }

    //验证控件
    validateControl(){
        if(!this.userDetailForm) { return; }
        const form = this.userDetailForm;

        for(const field in this.formErrors){
            //清除之前的错误信息
            this.formErrors[field] = '';
            const control = form.get(field);
            // console.log(field + ": constrolstatus=" + control.status);
            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key] + '';
                }
            }
        }
    }
    //需要进行验证的formControl
    formErrors = {
        'id': '',
        'name': '',
        'password': '',
        'roleId': ''
    }

    validationMessages = {
        'id': {
            'required': 'id不能为空',
            'userExist': 'id已经存在'
        },
        'name': {
            'required': '姓名不能为空'
        },
        'password': {
            'required': '密码不能为空'
        },
        'roleId': {
            'required': '角色不能为空'
        }
    };

    //重置用户表状态
    public reset(user?:User): void{
        if(user){
            this.user = user;
        }
        this.userDetailForm.reset({
            id: this.user.id,
            name: this.user.name,
            password: this.user.password,
            roleId: this.user.roleId
        });
    
        const idControl = this.userDetailForm.get('id');
        if(this.saveMode === saveMode.add){
            idControl.enable();
        }else{
            idControl.disable();
        }
        this.changeRole();
    }

    //改变当前选择角色
    public changeRole(){
        let roleId = this.userDetailForm.get('roleId').value;
        this.selectedRole = this.allRoles.find((value) => value.id === roleId);
    }

    ngOnInit(){
        this.loadRoles();
    }

    //@Input属性发生变化
    ngOnChanges(): void {
        this.reset(this.user);
    }

    //读取角色信息角色填充选择框
    private loadRoles(){
        this.roleService.getAllRoles()
            .then( response => {
                if(response){
                    this.allRoles = response;
                }
            })
    }

    private saveUser(){
        this.user = this.prepareSaveUser();
        //调用UserService服务添加用户,激活保存完成事件
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
            });
    }

    private prepareSaveUser(): User {
        const formModel = this.userDetailForm.value;
        const saveUser: User = {
            id: formModel.id,
            password: formModel.password as string,
            name: formModel.name as string,
            roleId: formModel.roleId
        };

        if(this.saveMode !== saveMode.add){
            saveUser.id = this.user.id;
        }
        return saveUser;
    }

    onSubmit(){
        this.saveUser();
    }
}