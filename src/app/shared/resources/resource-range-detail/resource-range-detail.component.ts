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
import { PermissionWrapperDTO } from "app/core/entity/permission-wrapper-dto";
import { PermissionService } from "app/core/services/permission.service";
import { Permission } from "app/core/entity/permission";
import { PermissionWrapper } from "app/core/entity/permission-wrapper";

@Component({
    selector: 'resource-range-detail',
    templateUrl: './resource-range-detail.component.html'
})
export class ResourceRangeDetailComponent implements OnInit, OnChanges {

    @Input() wrapper: PermissionWrapper;
    @Input() saveMode: saveMode; //保存模式（只读，修改，新增）
    @Output() onSaveFinished = new EventEmitter<{saveMode:saveMode,sucess:boolean,message:string}>(); //保存完成后激活事件，参数包含保存类型（新增，修改）和保存结果以及附加消息

    //支持的权限列表
    readonly SUPPORT_PERMISSIONS = [
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

    public resourceRangePermissionWrapperForm: FormGroup;
    public resourceRangeForm: FormGroup;
    public permissionsForm: FormGroup;

    public allRoles: Array<Role> = [];

    constructor(private fb: FormBuilder, 
                private resourceRangeService: ResourceRangeService, 
                private permissionService: PermissionService, 
                private roleService: RoleService){
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

    

    //重置状态
    public reset(wrapper?:PermissionWrapper): void{
        if(wrapper){
            this.wrapper = wrapper;
        }
        this.resourceRangeForm.reset({
            filter: this.wrapper.resourceRange.filter,
            role: this.wrapper.resourceRange.roleId,
            matchAll: String(this.wrapper.resourceRange.matchAll)
        });

        //初始化权限选择框
        var permissionsObject = {};
        for(var permission of this.SUPPORT_PERMISSIONS) {
            if(this.wrapper && this.wrapper.permissions && this.wrapper.permissions instanceof Array){
                var findIndex = this.wrapper.permissions.findIndex( value => value.mask === permission.value);
                if(findIndex > -1) {
                    permissionsObject[permission.controlName] = true;
                } else {
                    permissionsObject[permission.controlName] = false;
                }
            } else {
                permissionsObject[permission.controlName] = false;
            }
        }
        console.log(permissionsObject);
        this.permissionsForm.reset(permissionsObject);
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
        const rpWrapper: PermissionWrapper = this.prepareSave();

        //保存ResourceRange
        this.resourceRangeService.save(rpWrapper.resourceRange)
            .then(response => {
                if(response && response.id){
                    //保存Permission
                    let wrapperDTO = new PermissionWrapperDTO(response.id, rpWrapper.permissions);
                    
                    this.permissionService.save(wrapperDTO)
                        .then(() => {
                            this.onSaveFinished.emit({
                                            saveMode: this.saveMode,
                                            sucess: true, 
                                            message: '保存成功'})
                        }
                    )
                }else{
                    this.onSaveFinished.emit({
                                            saveMode: this.saveMode,
                                            sucess: false, 
                                            message: '保存失败'})
                }
            });
    }

    //复制ResourceRange信息
    private prepareResourceRangeFormSave(): any {
        const formModel = this.resourceRangeForm.value;

        let saveResourceRange = {
            resourceTypeClassName: this.wrapper.resourceRange.resource,
            filter: formModel.filter,
            roleId: formModel.role,
            matchAll: formModel.matchAll
        };


        if(this.saveMode === saveMode.update){
            saveResourceRange = Object.assign({}, saveResourceRange, {id: this.wrapper.resourceRange.id});
        }

        return saveResourceRange;
    }

    //复制全部信息
    private prepareSave(): PermissionWrapper {
        const range = this.prepareResourceRangeFormSave();

        var selPermissions: Permission[] = [];;
        for(var permission of this.SUPPORT_PERMISSIONS) {
            if(this.permissionsForm.get(permission.controlName).value) {
                selPermissions.push(new Permission(permission.value));
            }
        }

        const wrapper = {
            resourceRange: range,
            permissions: selPermissions
        }

        return wrapper;
    }

    onSubmit(){
        this.save();
    }
}