const express = require('express')
const Supervisor = require('../model/supervisor')
const Area = require('../model/area')
const NodeInfo = require('../model/node_info')
const UserInfo = require('../model/user_info')
const UserPermission = require('../model/user_permission')
const UserRecord = require('../model/user_record')
const {extractCache} = require('../model/common')

const router = express.Router()

// PC端接口
router.get('/extractCache/:area/:secret', extractCache)
router.post('/commit/:area/:secret',
    Area.handle,
    NodeInfo.handle,
    UserInfo.handle,
    UserPermission.handle,
    UserRecord.handle,
    (req, res) => res.end('It\'s OK!')
)

// 登陆相关，这三个不要改顺序，不然会无限重定向
router.use('/login', Supervisor.loginPage)
router.post('/entry', Supervisor.login)
router.use(Supervisor.check)

// 主体页面和退出
router.get('/', (req, res) => res.render('index'))
router.get('/exit', Supervisor.exit)

// node_info
router.get('/nodes', NodeInfo.get)
router.put('/nodes', NodeInfo.set)
router.delete('/nodes', NodeInfo.del)

// user_info
router.get('/users', UserInfo.get)
router.put('/users', UserInfo.set)
router.delete('/users', UserInfo.del)

// user_permission
router.get('/permissions', UserPermission.get)
router.post('/permissions', UserPermission.add)
router.delete('/permissions', UserPermission.del)

// other
router.get('/areas', Area.get)
router.get('/records', UserRecord.get)
router.put('/password', Supervisor.resetPassword)

/**
 * 增加测试数据，每次每个表最多只能加一个
 * 数据内容请写在参数对象中
 * 
 * 注意：上线请将其注释！
 */
// router.get('/addTestData',
//     Area.addTestData({
//         no: '凌云1'
//     }),

//     NodeInfo.addTestData({
//         area: '凌云1',
//         nodeId: 111,
//         place: 11,
//         nodeName: '101',
//         status: 1
//     }),

//     UserInfo.addTestData({
//         area: '凌云1',
//         cardNo: 47198731,
//         personId: 'ITT23009',
//         name: '宋萨',
//         phone: '18064566712'
//     }),

//     UserPermission.addTestData({
//         area: '凌云1',
//         id: 113,
//         cardNo: 47198731,
//         personId: 'ITT23009',
//         name: '宋萨',
//         nodeId: 111,
//         type: 3,
//         startPeriod: '2012-02-02',
//         endPeriod: '2012-02-09',
//         startTime: '13:00',
//         endTime: '14:00'
//     }),

//     UserRecord.addTestData({
//         area: '凌云1',
//         cardNo: 47198731,
//         permissionId: 113,
//         nodeId: 111
//     }),

//     (req, res) => res.send('completed!')
// )

module.exports = router