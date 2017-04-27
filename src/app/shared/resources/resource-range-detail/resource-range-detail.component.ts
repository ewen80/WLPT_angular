import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { ResourceService } from '../../../core/services/resource.service';
import { Resource } from '../../../core/entity/resource';
import { saveMode, PermissionType } from '../../../core/enums';
import { ResourceClassNameValidator } from '../../validators/resource-classname-validator';
import { ResourceRange } from "../../../core/entity/resource-range";
import { ResourceRangeService } from "../../../core/services/resource-range.service";
import { Role } from "../../../core/entity/role";
import { RoleService } from "../../../core/services/role.service";
import { ResourceRangePermissionWrapper } from "app/core/entity/resource-range-permission-wrapper";

@Component({
    selector: 'resource-range-detail',
    templateUrl: './resource-range-detail.component.html'
})
export class ResourceRangeDetailComponent implements OnInit, OnChanges {

    @Input() range: ResourceRange;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息

    public resourceRangePermissionWrapperForm: FormGroup;
    public resourceRangeForm: FormGroup;
    public permissionsForm: FormGroup;

    public allRoles: Array<Role> = [];

    constructor(private fb: FormBuilder, private resourceRangeService: ResourceRangeService, private roleService: RoleService){
        this.createForm();
    }

    private createForm():void{
        this.resourceRangeForm = this.fb.group({
            filter:[''],
            role:['', Validators.required],
            matchAll:[''],
        });
        this.permissionsForm = this.fb.group({
            readPermission:[],
            writePermission:[]
        });
        this.resourceRangePermissionWrapperForm = this.fb.group({
            resourceRangeForm: this.resourceRangeForm,
            permissionsForm: this.permissionsForm
        });

        this.resourceRangePermissionWrapperForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.resourceRangePermissionWrapperForm.statusChanges.subscribe(status => this.onValidatorStatusChanged(status));
        
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
        if(!this.resourceRangePermissionWrapperForm.get('resourceRangeForm')) { return; }
        const form = this.resourceRangePermissionWrapperForm.get('resourceRangeForm');

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
    //需要进行验证的formControl
    formErrors = {
        'role': '',
        'filter': ''
    }

    validationMessages = {
        'role': {
            'required': '角色不能为空'
        },
        'filter':{
            'required': '过滤器不能为空',
        },
    };

    //支持的权限列表
    permissions = [
        {
            controlName: 'readPermission',
            value: PermissionType.READ,
            label: '读'            
        },
        {
            controlName: 'writePermission',
            value: PermissionType.WRITE,
            label: '写'
        }
    ];

    //重置状态
    public reset(range?:ResourceRange): void{
        if(range){
            this.range = range;
        }
        this.resourceRangeForm.reset({
            filter: this.range.filter,
            role: this.range.roleId,
            matchAll: String(this.range.matchAll)
        });
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
        this.range = this.prepareResourceRangeFormSave();
        this.prepareSave();

        // //调用Service服务添加用户,激活保存完成事件
        // this.resourceRangeService.save(this.range)
        //     .then(response => {
        //         if(response){
        //             this.onSaveFinished.emit({
        //                                     saveMode: this.saveMode,
        //                                     sucess: true, 
        //                                     message: '保存成功'})
        //         }else{
        //             this.onSaveFinished.emit({
        //                                     saveMode: this.saveMode,
        //                                     sucess: false, 
        //                                     message: '保存失败'})
        //         }
        //     });
    }

    private prepareResourceRangeFormSave(): any {
        const formModel = this.resourceRangeForm.value;

        const saveResourceRange = {
            id: 0,
            resourceTypeClassName: this.range.resource,
            filter: formModel.filter,
            roleId: formModel.role,
            matchAll: formModel.matchAll
        };


        if(this.saveMode === saveMode.update){
            saveResourceRange.id = this.range.id;
        }

        return saveResourceRange;
    }

    //复制全部信息
    private prepareSave(): ResourceRangePermissionWrapper {
        const range = this.prepareResourceRangeFormSave();
        var selPermissions: PermissionType[] = [];;
        for(var permission of this.permissions) {
            if(this.permissionsForm.get(permission.controlName).value) {
                selPermissions.push(permission.value);
            }
            
        }
        // const formPermissions = this.permissionsForm.get();
        // console.log(formModel);

        // const wrapper = {
        //     resourceRangeId: 0,
        //     permissions: formModel.permissions
        // }

        // if(this.saveMode === saveMode.update) {
        //     permission.resourceRangeId = this.range.id;
        // }
        // return permission;
        return null;
    }

    onSubmit(){
        this.save();
    }
}