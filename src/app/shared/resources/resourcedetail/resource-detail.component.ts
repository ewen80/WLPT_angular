import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ResourceService } from '../../../core/services/resource.service';
import { Resource } from '../../../core/entity/resource';
import { saveMode } from '../../../core/enums';
import { ResourceClassNameValidator } from '../../validators/resource-classname-validator';

@Component({
    selector: 'resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent implements OnChanges {
    @Input() resource: Resource;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息

    public resourceDetailForm: FormGroup;

    constructor(private fb: FormBuilder, private resourceService: ResourceService){
        this.createForm();
    }

    private createForm():void{
        this.resourceDetailForm = this.fb.group({
            // When you reference a method you lose the object it's attached on. You can force this using the bind method
            name: ['',Validators.required],
            className: ['',Validators.required,(new ResourceClassNameValidator(this.resourceService)).validate.bind(this)],
            description: [''],
            deleted: ['']
        });
        this.resourceDetailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.resourceDetailForm.statusChanges.subscribe(status => this.onValidatorStatusChanged(status));
        
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
        if(!this.resourceDetailForm) { return; }
        const form = this.resourceDetailForm;

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
        'className': '',
    }

    validationMessages = {
        'name': {
            'required': '资源名不能为空'
        },
        'className':{
            'required': '全限定名不能为空',
            'resourceExist': '全限定名不能重复'
        }
    };

    //重置状态
    public reset(resource?:Resource): void{
        if(resource){
            this.resource = resource;
        }
        this.resourceDetailForm.reset({
            name: this.resource.name,
            className: this.resource.className,
            description: this.resource.description,
            deleted: String(this.resource.deleted)
        });

        const idControl = this.resourceDetailForm.get('className');
        if(this.saveMode === saveMode.add){
            idControl.enable();
        }else{
            idControl.disable();
        }
    }

    //@Input属性发生变化
    ngOnChanges(): void {
        this.reset();
    }

    private save(){
        this.resource = this.prepareSave();
        //调用UserService服务添加用户,激活保存完成事件
        this.resourceService.save(this.resource).
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

    private prepareSave(): Resource {
        const formModel = this.resourceDetailForm.value;

        const saveResource: Resource = {
            name: formModel.name,
            className: formModel.className,
            description: formModel.description,
            deleted: formModel.deleted
        };

        if(this.saveMode !== saveMode.add){
            saveResource.className = this.resource.className;
        }

        return saveResource;
    }

    onSubmit(){
        this.save();
    }
}