import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { ResourceListService } from '../../../core/services/resourcelist.service';
import { ResourceType } from '../../../core/entity/resourcetype';
import { saveMode } from '../../../enums';
import { ResourceTypeNameValidator } from '../../validators/resourceType-validator';

@Component({
    selector: 'resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class UserDetailComponent implements OnChanges {
    @Input() resourceType: ResourceType;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息

    public resourceTypeDetailForm: FormGroup;

    constructor(private fb: FormBuilder, private resourceListService: ResourceListService){
        this.createForm();
    }

    private createForm():void{
        this.resourceTypeDetailForm = this.fb.group({
            // When you reference a method you lose the object it's attached on. You can force this using the bind method
            name: ['',Validators.required,(new ResourceTypeNameValidator(this.resourceListService)).validate.bind(this)],
            className: ['',Validators.required]
        });
        this.resourceTypeDetailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.resourceTypeDetailForm.statusChanges.subscribe(status => this.onValidatorStatusChanged(status));
        
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
        if(!this.resourceTypeDetailForm) { return; }
        const form = this.resourceTypeDetailForm;

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
        'name': '',
        'className': ''
    }

    validationMessages = {
        'name': {
            'required': '姓名不能为空'
        },
        'className':{
            'required': '权限定名不能为空'
        }
    };

    //重置状态
    public reset(resourceType?:ResourceType): void{
        if(resourceType){
            this.resourceType = resourceType;
        }
        this.resourceTypeDetailForm.reset({
            name: this.resourceType.name,
            className: this.resourceType.className
        });
    }

    //@Input属性发生变化
    ngOnChanges(): void {
        this.reset();
    }

    private save(){
        this.resourceType = this.prepareSave();
        //调用UserService服务添加用户,激活保存完成事件
        this.resourceListService.saveResourceType(this.resourceType).
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

    private prepareSave(): ResourceType {
        const formModel = this.resourceTypeDetailForm.value;

        const saveResourceType: ResourceType = {
            id: null,
            name: formModel.name,
            className: formModel.className
        };

        if(this.saveMode !== saveMode.add){
            saveResourceType.id = this.resourceType.id;
        }
        return saveResourceType;
    }

    onSubmit(){
        this.save();
    }
}