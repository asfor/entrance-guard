var crypto = require('crypto')
var express = require('express')
var Supervisor = require('../model/db/supervisor')
var {adminID, secret} = require('../config')
var router = express.Router()

// 采用 sha256 散列算法和 hex 编码
function encrypt(value) {
    return crypto
        .createHmac('sha256', secret)
        .update(value)
        .digest('hex')
}

router.use('/login', (req, res) => {
    res.render('login')
})

router.post('/entry', (req, res) => {
    Supervisor.findOne({_id: adminID}, (err, result) => {
        const unknown = req.body
        const real = result

        unknown.password = encrypt(unknown.password)

        if(unknown.username === real.username && unknown.password === real.password) {
            req.session.isLogged = true
            res.redirect('/')
        } else
            res.render('login', { msg: '用户名或密码错误' })
    })
})

// 登陆验证
router.use((req, res, next) => {
  if(!req.session.isLogged)
    return res.redirect('/login')

  next()
})

router.get('/', (req, res) => {
    res.render('index')
})

// 退出登陆
router.get('/exit', (req, res) => {
    req.session.distroy((err) => {
        res.redirect('/login')
    })
})

// 修改密码
router.put('/password', (req, res) => {
    let {newPassword, oldPassword} = req.body
    
    res.setHeader('Content-Type', 'application/json')

    new Promise((resolve, reject) => Supervisor.findOne({_id: adminID}, (err, result) => {
        if(err) reject(err)
        resolve(result)
    })).then(({password}) => {
        oldPassword = encrypt(oldPassword)

        if(oldPassword !== password) {
            res.status(403).send({msg: '原密码错误'})
        } else {
            newPassword = encrypt(newPassword)
            Supervisor.update({_id: adminID}, {$set: {password: newPassword}}, (err) => {
                if (err)    res.status(500).send({msg: '修改失败，请重试'})
                else        res.status(200).send({msg: '修改成功'})
            })
        }
    }).catch(err => res.status(500).send({msg: '数据库查询错误，请重试\n\n' + err}))
})



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
