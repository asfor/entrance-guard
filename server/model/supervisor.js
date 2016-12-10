var crypto = require('crypto')
var Supervisor = require('./db/supervisor')
var {adminID, secret} = require('../config')

// 采用 sha256 散列算法和 hex 编码
function encrypt(value) {
    return crypto
        .createHmac('sha256', secret)
        .update(value)
        .digest('hex')
}

// 登陆页
exports.loginPage = (req, res) => {
    res.render('login')
}

// 登陆
exports.login = (req, res) => {
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
}

// 登陆验证
exports.check = (req, res, next) => {
    if(!req.session.isLogged)
        return res.redirect('/login')

    next()
}

// 退出登陆
exports.exit = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login')
    })
}

// 修改密码
exports.resetPassword = (req, res) => {
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
}