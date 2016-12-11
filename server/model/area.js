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

exports.handle = (req, res, next) => {
    const area = req.params.area + ''

    Area.find({}, (err, docs) => {
        if(err)
            console.error('Area Search: \n' + err)
        else
            for(const _area of docs.map(area => area.no))
                if(area === _area + '')
                    return next()

        Area.create({no: area}, err => {
            console.error('Area Create: \n' + err)
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