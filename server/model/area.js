const Area = require('./db/area')
const {encrypt, mapQuery, mapBind} = require('./common')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    Area.find({}, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.handle = (req, res, next) => {
    const {area, secret} = req.params
    const _area = mapQuery(req.ip)

    if(_area)
        if(_area !== area)
            return res.status(403).send({msg: 'IP与绑定映射地址不符'})
    else
        mapBind(ip, area)

    Area.findOne({no: area}, (err, doc) => {
        if(err)
            res.end('Area Search: \n' + err)
        else
            if(doc)
                if(encrypt(secret) === doc.key)
                    return next()
                else
                    return res.status(403).send({msg: '密钥验证错误'})

        Area.create({
            no: area,
            key: encrypt(secret)
        }, err => {
            if(err)
                return res.end('Area Create: \n' + err)

            next()
        })
    })
}

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    Area.create(newData, err => {
        if(err) console.log('Area: \n' + err)
        next()
    })
}