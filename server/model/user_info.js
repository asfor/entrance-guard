var UserInfo = require('./db/user_info')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if(req.query.name === '')
        req.query.name = undefined
    else
        req.query.name = new RegExp(req.query.name)

    UserInfo.find(req.query, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.set = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserInfo.update({cardNo: req.body.cardNo}, {$set: req.body}, err => {
        if(err)
            res.status(500).send({msg: '修改失败，请重试\n' + err})
        else
            res.send(JSON.stringify({msg: '修改成功'}))
    })
}

exports.del = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserInfo.remove({cardNo: req.query.cardNo}, err => {
        if(err)
            res.status(500).send({msg: '删除失败，请重试\n' + err})
        else
            res.send(JSON.stringify({msg: '删除成功'}))
    })
}

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    UserInfo.create(newData, err => {
        if(err) console.log('UserInfo: \n' + err)
        next()
    })
}