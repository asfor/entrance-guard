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
router.use(Supervisor.check)
router.get('/', (req, res) => res.render('index'))
router.get('/exit', Supervisor.exit)

router.get('/nodes', NodeInfo.get)
router.put('/nodes', NodeInfo.set)
router.delete('/nodes', NodeInfo.del)

router.get('/permissions', UserPermission.get)
router.post('/permissions', UserPermission.add)
router.delete('/permissions', UserPermission.del)

router.get('/areas', Area.get)
router.get('/users', UserInfo.get)
router.get('/records', UserRecord.get)

router.put('/password', Supervisor.resetPassword)

router.get('/C', (req, res, next) => {
    Supervisor.create({
        username: 'wocao',
        password: 'nidayede'
    }, (err) => {
        if(err) throw new Error('Create Err')

        res.send('Create OK!')
    })

    res.send()
})

router.get('/U', (req, res, next) => {
    Supervisor.update({
        username: 'wocao'
    }, {
        $set: {
            username: 'fuck you',
            password: '!!!!!!'
        }
    }, (err) => {
        if(err) throw new Error('Updata Err')

        res.send('Updata OK!')
    })
})

router.get('/R', (req, res, next) => {
    Supervisor.find({}, (err, docs) => {
        if(err) throw new Error('Read Err')

        res.send(docs)
    })
})

router.get('/D', (req, res, next) => {
    Supervisor.remove({
        password: '!!!!!!'
    }, (err) => {
        if(err) throw new Error('Deleted Err')

        res.send('Deleted!')
    })
})

module.exports = router
