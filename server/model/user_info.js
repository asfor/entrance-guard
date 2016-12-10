var UserInfo = require('./db/user_info')

exports.get = (req, res) => {
    const query = req.query

    res.setHeader('Content-Type', 'application/json')

    UserRecord.find({
        area: query.area
    }, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}