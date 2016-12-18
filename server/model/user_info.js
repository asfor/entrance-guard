const UserInfo = require('./db/user_info')
const {cache, resetArea, handle} = require('./common')

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
    const body = JSON.parse(JSON.stringify(req.body))
    const {area, cardNo} = body

    delete body.area
    delete body.cardNo

    let areaCache = cache[area]

    if(!areaCache)
        areaCache = cache[area] = resetArea(area)

    areaCache.userInfo.set.push({
        cardNo: cardNo,
        content: body,
        time: Date.now().toString()
    })

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '修改请求已提交'})
}

exports.del = (req, res) => {
    const {area, cardNo} = req.query
    let areaCache = cache[area]

    if(!areaCache)
    areaCache = cache[area] = resetArea(area)

    areaCache.userInfo.del.push(cardNo)

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '删除请求已提交'})
}

exports.handle = handle('userInfo', UserInfo, 'cardNo')

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    UserInfo.create(newData, err => {
        if(err) console.log('UserInfo: \n' + err)
        next()
    })
}