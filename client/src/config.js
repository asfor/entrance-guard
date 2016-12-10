// 顶部标题
const title = '魔法系统'

// 侧边栏
const sidebarItems = [{
//     title: '发卡管理',
//     component: 'OutCard',
//     iconClass: 'tag'
// },{
    title: '用户管理',
    component: 'Users',
    iconClass: 'head'
},{
    title: '权限管理',
    component: 'Permission',
    iconClass: 'unlock'
},{
    title: '节点管理',
    component: 'Node',
    iconClass: 'grid'
},{
    title: '出入记录',
    component: 'Record',
    iconClass: 'paper'
},{
//     title: '门禁状态',
//     component: 'EntranceGuardState',
//     iconClass: 'signal'
// },{
    title: '修改密码',
    component: 'Password',
    iconClass: 'cog'
}]

// 右上方退出按钮
const exit = {
    title: '退出系统',
    route: 'exit'
}

// 初始界面组件
const initView = {
    component: 'Users',
    index: 0    // 组件在数组中的索引
}

export {title, sidebarItems, exit, initView}