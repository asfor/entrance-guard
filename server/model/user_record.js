var UserRecord = require('./db/user_record')

exports.get = (req, res) => {
    const query = req.query

    res.setHeader('Content-Type', 'application/json')

    UserRecord.find({
        area: query.area,
        cardNo: query.card,
        nodeId: query.node
    }, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}