import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';



import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/entity/role';
import { saveMode } from '../../../enums';

@Component({
    selector: 'role-detail',
    templateUrl: './roledetail.component.html'
})
export class RoleDetailComponent implements OnInit{

    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息
    
    @ViewChild('roleDetailForm') roleDetailForm: NgForm;

    public role: Role;

    constructor(private roleService: RoleService){    }

    //重置用户表状态
    public Reset(): void{
        if(this.roleDetailForm){
            this.roleDetailForm.resetForm();
        }
    }

    ngOnInit(){
        this.role = new Role();
    }

    private saveRole(){
        //调用RoleService服务保存角色,激活保存完成事件
        this.roleService.saveRole(this.role)
            .then(response => {
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

    // private updateRole(){
    //     this.roleService.updateRole(this.role).
    //         then(response => this.onSaveFinished.emit({
    //                                                 saveMode: this.saveMode,
    //                                                 sucess: response.sucess, 
    //                                                 message: response.message}));
    // }

    onSubmit(){
        // switch(this.saveMode){
        //     case saveMode.add:
        //         this.addRole();
        //         break;
        //     case saveMode.update:
        //         this.updateRole();
        //         break;
        // }
        this.saveRole();
    }
}