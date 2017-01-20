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

    public user: User;

    constructor(private userService: UserService){    }

    //重置用户表状态
    public Reset(): void{
        if(this.userDetailForm){
            this.userDetailForm.resetForm();
        }
    }

    ngOnInit(){
        this.user = new User();
    }

    private addUser(){
        //调用UserService服务添加用户,激活保存完成事件
        this.userService.addUser(this.user).
            then(response => this.onSaveFinished.emit({
                                                    saveMode: this.userSaveMode,
                                                    sucess: response.sucess, 
                                                    message: response.message}));
    }

    private updateUser(){
        this.userService.updateUser(this.user).
            then(response => this.onSaveFinished.emit({
                                                    saveMode: this.userSaveMode,
                                                    sucess: response.sucess, 
                                                    message: response.message}));
    }

    onSubmit(){
        switch(this.userSaveMode){
            case saveMode.add:
                this.addUser();
                break;
            case saveMode.update:
                this.updateUser();
                break;
        }
    }
}