import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';



import { UserService } from '../../../core/user/user.service';
import { User } from '../../../core/user/user';
import { saveMode } from '../../../enums';

@Component({
    selector: 'user-detail',
    templateUrl: './userdetail.component.html'
})
export class UserDetailComponent implements OnInit{

    @Input() userSaveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息
    
    @ViewChild('userDetailForm') userDetailForm: NgForm;

    private user = new User();

    public infoReadOnly: boolean;

    constructor(private userService: UserService){    }

    getUserInfo(){

    }

    ngOnInit(){
        if(this.userSaveMode === saveMode.no){
            this.infoReadOnly = true;
        }else{
            this.infoReadOnly = false;
        }

        if (this.userDetailForm) {
            this.userDetailForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data:any){
        if (!this.userDetailForm) { return; }
        const form = this.userDetailForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'id': '',
        'password': '',
        'name':''
    };

    validationMessages = {
        'id': {
            'required': '用户名不能为空'
        },
        'password': {
            'required': '密码不能为空'
        },
        'name':{
            'required': '姓名不能为空'
        }
    }

    onSubmit(){
        //调用UserService服务添加用户,激活保存完成事件
        this.userService.addUser(this.user).then(response => this.onSaveFinished.emit({saveMode: this.userSaveMode,sucess: response.sucess, message: response.message}));
    }
}