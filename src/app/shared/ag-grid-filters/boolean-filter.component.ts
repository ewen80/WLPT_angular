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
    
    // The grid calls this to know if the filter icon in the header should be shown. Return true to show.
    isFilterActive(): boolean {
        return Boolean(this.selected !== "all");
    }

    // The grid will ask each active filter, in turn, whether each row in the grid passes. If any
    // filter fails, then the row will be excluded from the final set. The method is provided a
    // params object with attributes node (the rodNode the grid creates that wraps the data) and data
    // (the data object that you provided to the grid for that row).
    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return params.node.data.deleted.toString() == this.selected;
    }

    // Gets the filter state for storing
    getModel() {
        // if(this.selected !== "all"){
        //     return {
        //         type: "equals",
        //         filter: this.selected
        //     }
        // }else{
        //     return {};
        // }
        return { value: this.selected};
    }

    // Restores the filter state. Called either as a result of user calling
    // gridApi.setSortModel OR the floating filter changed (only if using floating filters).
    setModel(model: any): void {
        this.selected = model.value;
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