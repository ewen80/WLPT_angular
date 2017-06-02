//保存模式
export enum saveMode{
    no = 0, //不保存
    add = 1,
    update = 2
}

//权限类型
export enum PermissionType {
    READ = 1,   //读权限
    WRITE = 2   //写权限
}

//菜单管理保存类型
export enum MenuOperationType {
    addRootMenu,    //添加根菜单
    addChildMenu    //添加子菜单
}