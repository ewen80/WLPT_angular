import { SerializationHelper } from "./serialization-helper";

/**
 * Ag-grid组件的filter序列化
 */
export class AggridFilterSerialization implements SerializationHelper {
    serialize(): string {
        var serString = "";
        const filterModel = this.filterModel;
        if(filterModel && Object.keys(filterModel).length>0){
            let filterNameArray = Object.keys(filterModel); //过滤条件数组
            filterNameArray.forEach( (value) => {
                const filter = filterModel[value];
                console.log(filter); //value字段名,filterModel[value]字段值
                if(filter.type){
                    serString += "&" + value;
                    switch(filter.type){
                        case "contains":
                            serString += "%";
                            break;
                        case "equals":
                            serString += ":";
                            break;
                        case "notEquals":
                            serString += "!:";
                            break;
                        case "startswith":
                            serString += "~";
                            break;
                        case "endwith":
                            serString += "^";
                            break;
                        
                    }
                    serString += filter.filter;
                }
            });
        }
        return serString;
    }

    constructor(private filterModel:any){}
}