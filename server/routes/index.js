var express = require('express')
var Supervisor = require('../model/supervisor')
var Area = require('../model/area')
var NodeInfo = require('../model/node_info')
var UserInfo = require('../model/user_info')
var UserPermission = require('../model/user_permission')
var UserRecord = require('../model/user_record')

var router = express.Router()

// 前三个不要改顺序，不然会无限重定向
router.use('/login', Supervisor.loginPage)
router.post('/entry', Supervisor.login)
// router.use(Supervisor.check)
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
router.get('/addTestData',
    Area.addTestData({
        no: 11,
        name: '芙蓉1'
    }),

    NodeInfo.addTestData({
        area: 11,
        nodeId: 103,
        place: 1,
        nodeName: '103',
        status: 0
    }),

    UserInfo.addTestData({
        area: 11,
        cardNo: 1234567,
        personId: 'ITT13080',
        name: '韩英俊',
        phone: '18064566666'
    }),

    UserPermission.addTestData({
        area: 11,
        id: 111,
        cardNo: 1234567,
        personId: 'ITT13080',
        name: '韩英俊',
        nodeId: 103,
        type: 1,
        startPeriod: '2012-02-02',
        endPeriod: '2012-02-09',
        startTime: '13:00',
        endTime: '14:00'
    }),

    UserRecord.addTestData({
        area: 11,
        cardNo: 1234567,
        permissionId: 111,
        nodeId: 103
    }),

    (req, res) => res.send('completed!')
)

module.exports = router