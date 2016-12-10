var Area = require('./db/area')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    Area.find({}, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}