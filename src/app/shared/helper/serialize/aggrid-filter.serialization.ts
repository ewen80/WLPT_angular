import { SerializationHelper } from "./serialization-helper";

/**
 * Ag-grid组件的filter序列化
 */
export class AggridFilterSerialization implements SerializationHelper {
    
    public filterModel:any;

    serialize(): string {
        var serString = "";
        const filterModel = this.filterModel;
        if(filterModel && Object.keys(filterModel).length>0){
            let filterNameArray = Object.keys(filterModel); //过滤条件数组
            filterNameArray.forEach( (value) => {
                const filter = filterModel[value];
                console.log(filter); //value字段名,filterModel[value]字段值
                if(filter.type){
                    serString += value;
                    switch(filter.type){
                        case "notEquals":
                            serString += "!";
                            break;
                        case "equals":
                        case "contains":
                        case "startsWith":
                        case "endsWith":
                        default:
                            serString += ":";
                            break;
                       //TODO：大于、小于等待添加
                        
                    }
                    switch(filter.type){
                        case "contains":
                            serString += "*" + filter.filter + "*";
                            break;
                        case "startsWith":
                            serString += filter.filter + "*";
                            break;
                        case "endsWith":
                            serString += "*" + filter.filter;
                            break;
                        default:
                            serString += filter.filter;
                            break;
                    }
                    serString += ",";
                }
            });
        }
        return serString.substr(0, serString.length-1);
    }
}