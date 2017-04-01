import { Component, ViewChild, ViewContainerRef } from "@angular/core";

import { IFloatingFilterComp } from 'ag-grid-angular/main';
import { IFloatingFilterParams, IAfterGuiAttachedParams, RowNode } from "ag-grid";

@Component({
    selector: "boolean-floatingFilter-cell",
    template:`
        <select #select  (ngModelChange)="onChange($event)" [ngModel]="select"><option value=true>是</option><option value=false>否</option></select>
    `
})
export class BooleanFloatingFilterComponent implements IFloatingFilterComp { 

    private params: IFloatingFilterParams<any,any>;
    private mySelected: boolean;

    @ViewChild('select', {read: ViewContainerRef}) public select;

    onParentModelChanged(parentModel: any): void {
        if(parentModel){
            this.select.value = parentModel.filter;
            this.mySelected = parentModel.filter;
        }else{
            this.select.value = null;
            this.mySelected = null;
        }
    }
    agInit(params: IFloatingFilterParams<any, any>): void {
        this.params = params;
    }
    

    onChange(newValue){
        if(this.mySelected !== newValue){
            this.mySelected = newValue;
            this.params.onFloatingFilterChanged({
                type: "Equals",
                filter: newValue
            });
        }
    }

}