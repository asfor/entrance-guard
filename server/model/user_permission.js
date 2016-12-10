var UserPermission = require('./db/user_permission')

exports.get = (req, res) => {
    const {area, personId, nodeId} = req.query

    res.setHeader('Content-Type', 'application/json')

    UserRecord.find({
        area,
        personId,
        nodeId
    }, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.add = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserRecord.create(req.body, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.del = (req, res) => {}