var UserRecord = require('./db/user_record')
var {cache, resetArea, handle} = require('./common')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    UserRecord.find(req.query, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.handle = (req, res, next) => {
    const area = req.params.area
    const data = req.body.userRecord

    data.forEach((doc, index) => data[index].area = area)

    model.create(data)

    next()
}

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    UserRecord.create(newData, err => {
        if(err) console.log('UserRecord: \n' + err)
        next()
    })
}