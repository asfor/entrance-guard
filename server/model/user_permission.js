var UserPermission = require('./db/user_permission')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserPermission.find(req.query, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.add = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserPermission.create(req.body, (err, docs) => {
        if(err)
            res.status(500).send({msg: '添加失败，请重试\n' + err})
        else
            res.send(JSON.stringify({msg: '添加成功'}))
    })
}

exports.del = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserPermission.remove({cardNo: req.query.cardNo}, err => {
        if(err)
            res.status(500).send({msg: '删除失败，请重试\n' + err})
        else
            res.send(JSON.stringify({msg: '删除成功'}))
    })
}

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    UserPermission.create(newData, err => {
        if(err) console.log('UserPermission: \n' + err)
        next()
    })
}