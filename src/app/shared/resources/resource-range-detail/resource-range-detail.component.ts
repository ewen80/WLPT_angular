import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { ResourceService } from '../../../core/services/resource.service';
import { Resource } from '../../../core/entity/resource';
import { saveMode } from '../../../enums';
import { ResourceClassNameValidator } from '../../validators/resource-classname-validator';
import { ResourceRange } from "../../../core/entity/resource-range";
import { ResourceRangeService } from "../../../core/services/resource-range.service";
import { Role } from "../../../core/entity/role";
import { RoleService } from "../../../core/services/role.service";

@Component({
    selector: 'resource-range-detail',
    templateUrl: './resource-range-detail.component.html'
})
export class ResourceRangeDetailComponent implements OnInit, OnChanges {

    @Input() range: ResourceRange;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息

    public resourceRangeDetailForm: FormGroup;
    public allRoles: Array<Role> = [];

    constructor(private fb: FormBuilder, private resourceRangeService: ResourceRangeService, private roleService: RoleService){
        this.createForm();
    }

    private createForm():void{
        this.resourceRangeDetailForm = this.fb.group({
            // When you reference a method you lose the object it's attached on. You can force this using the bind method
            name: ['',Validators.required],
            className: ['',Validators.required],
            description: [''],
            deleted: ['false']
        });
        this.resourceRangeDetailForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.resourceRangeDetailForm.statusChanges.subscribe(status => this.onValidatorStatusChanged(status));
        
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
        if(!this.resourceRangeDetailForm) { return; }
        const form = this.resourceRangeDetailForm;

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
        'role': '',
        'filter': '',
        'matchAll': ''
    }

    validationMessages = {
        'role': {
            'required': '角色不能为空'
        },
        'filter':{
            'required': '过滤器不能为空',
        },
    };

    //重置状态
    public reset(range?:ResourceRange): void{
        if(range){
            this.range = range;
        }
        this.resourceRangeDetailForm.reset({
            // name: this.resource.name,
            // className: this.resource.className,
            // description: this.resource.description,
            // deleted: String(this.resource.deleted)
        });

        // const idControl = this.resourceDetailForm.get('className');
        // if(this.saveMode === saveMode.add){
        //     idControl.enable();
        // }else{
        //     idControl.disable();
        // }
    }

    //@Input属性发生变化
    ngOnChanges(): void {
        this.reset();
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

    ngOnInit(): void {
        this.loadRoles();
    }

    private save(){
        this.range = this.prepareSave();
        //调用Service服务添加用户,激活保存完成事件
        this.resourceRangeService.save(this.range).
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

    private prepareSave(): ResourceRange {
        const formModel = this.resourceRangeDetailForm.value;

        const saveResourceRange: ResourceRange = {
            // name: formModel.name,
            // className: formModel.className,
            // description: formModel.description,
            // deleted: formModel.deleted
            id: formModel.id,
            resource: this.range.resource,
            filter: formModel.filter,
            roleId: formModel.role,
            matchAll: formModel.matchAll
        };

        // if(this.saveMode !== saveMode.add){
        //     saveResourceRange.className = this.resource.className;
        // }

        return saveResourceRange;
    }

    onSubmit(){
        this.save();
    }
}