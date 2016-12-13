var express = require('express')
var Supervisor = require('../model/supervisor')
var Area = require('../model/area')
var NodeInfo = require('../model/node_info')
var UserInfo = require('../model/user_info')
var UserPermission = require('../model/user_permission')
var UserRecord = require('../model/user_record')
var {extractCache} = require('../model/common')

var router = express.Router()

// PC端接口
router.get('/extractCache/:area', extractCache)
router.post('/commit/:area',
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
//         no: 11,
//         name: '芙蓉1'
//     }),

//     NodeInfo.addTestData({
//         area: 11,
//         nodeId: 115,
//         place: 1,
//         nodeName: '115',
//         status: 0
//     }),

//     UserInfo.addTestData({
//         area: 11,
//         cardNo: 47298739,
//         personId: 'ITT13047',
//         name: '宝宝',
//         phone: '18064566666'
//     }),

//     UserPermission.addTestData({
//         area: 11,
//         id: 111,
//         cardNo: 47298739,
//         personId: 'ITT13047',
//         name: '宝宝',
//         nodeId: 115,
//         type: 1,
//         startPeriod: '2012-02-02',
//         endPeriod: '2012-02-09',
//         startTime: '13:00',
//         endTime: '14:00'
//     }),

//     UserRecord.addTestData({
//         area: 11,
//         cardNo: 47298739,
//         permissionId: 111,
//         nodeId: 115
//     }),

//     (req, res) => res.send('completed!')
// )

module.exports = router