var NodeInfo = require('./db/node_info')
var {cache, resetArea, handle} = require('./common')

exports.get = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if(req.query.nodeName === '')
        req.query.nodeName = undefined
    else
        req.query.nodeName = new RegExp(req.query.nodeName)

    NodeInfo.find(req.query, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

// exports.set = (req, res) => {
//     const {area, nodeId, nodeName} = req.body

//     res.setHeader('Content-Type', 'application/json')

//     NodeInfo.update({
//         area,
//         nodeId
//     }, {$set: {nodeName}}, err => {
//         if(err)
//             res.status(500).send({msg: '修改失败\n' + err})
//         else
//             res.send({msg: '修改成功'})
//     })
// }

// exports.del = (req, res) => {
//     const {area, nodeId} = req.query

//     res.setHeader('Content-Type', 'application/json')

//     NodeInfo.remove({
//         area,
//         nodeId
//     }, err => {
//         if(err)
//             res.status(500).send({msg: '删除失败\n' + err})
//         else
//             res.send({msg: '删除成功'})
//     })
// }

exports.set = (req, res) => {
    const {area, nodeId, nodeName} = req.body
    let areaCache = cache[area]

    if(!areaCache)
        areaCache = cache[area] = resetArea(area, cache)

    areaCache.nodeInfo.set.push({
        nodeId: nodeId,
        content: {nodeName: nodeName}
    })

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '修改请求已提交'})
}

exports.del = (req, res) => {
    const {area, nodeId} = req.query
    let areaCache = cache[area]

    if(!areaCache)
    areaCache = cache[area] = resetArea(area)

    areaCache.nodeInfo.del.push(nodeId)

    res.setHeader('Content-Type', 'application/json')
    res.send({msg: '删除请求已提交'})
}

exports.handle = handle('nodeInfo', NodeInfo, 'nodeId')

exports.addTestData = newData => (req, res, next) => {
    if(!newData) next()

    NodeInfo.create(newData, err => {
        if(err) console.log('NodeInfo: \n' + err)
        next()
    })
}