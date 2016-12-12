var UserPermission = require('./db/user_permission')
var {cache, resetArea, handle} = require('./common')

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
    const body = JSON.parse(JSON.stringify(req.body))
    const {area} = body

    delete body.area

    let areaCache = cache[area]

    if(!areaCache)
        areaCache = cache[area] = resetArea(area)

    areaCache.userPermission.add.push(body)

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '权限新增请求已提交'})
}

exports.del = (req, res) => {
    const {area, id} = req.query
    let areaCache = cache[area]

    if(!areaCache)
    areaCache = cache[area] = resetArea(area)

    areaCache.userPermission.del.push(id)

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '删除请求已提交'})
}

exports.handle = handle('userPermission', UserPermission, 'id')

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    UserPermission.create(newData, err => {
        if(err) console.log('UserPermission: \n' + err)
        next()
    })
}