import { Component, ViewChild, ViewContainerRef } from "@angular/core";

import { AgFilterComponent } from "ag-grid-angular";
import { IFilterParams, IAfterGuiAttachedParams, IDoesFilterPassParams, RowNode } from "ag-grid";

@Component({
    selector: 'boolean-filter-cell',
    template: `
        <select #select (ngModelChange)="onChange($event)" [ngModel]="selected">
            <option value="all">全部</option>
            <option value="true">是</option>
            <option value="false">否</option>
        </select>
    `
})
export class AgGridBooleanFilterComponent implements AgFilterComponent {

    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    private selected: string = "all";

    @ViewChild('select', {read: ViewContainerRef}) public select;
    
    isFilterActive(): boolean {
        return Boolean(this.selected !== "all");

    }
    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return ;
    }
    getModel() {
        if(this.selected !== "all"){
            return {
                type: "equals",
                filter: this.selected
            }
        }else{
            return {};
        }
    }
    setModel(model: any): void {
        this.selected = model.filter;
    }
    
    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }
    
    onChange(newValue): void {
        if (this.selected !== newValue) {
            this.selected = newValue;
            this.params.filterChangedCallback();
        }
    }

}