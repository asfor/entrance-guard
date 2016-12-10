var NodeInfo = require('./db/node_info')

exports.get = (req, res) => {
    const {area, nodeName} = req.query

    res.setHeader('Content-Type', 'application/json')
    
    NodeInfo.find({
        area,
        nodeName
    }, (err, docs) => {
        if(err)
            res.status(500).send({msg: '数据库查询错误，请重试\n' + err})
        else
            res.send(JSON.stringify({data: docs}))
    })
}

exports.set = (req, res) => {
    const {area, nodeId, nodeName} = req.body

    res.setHeader('Content-Type', 'application/json')

    NodeInfo.update({
        area,
        nodeId
    }, {$set: {nodeName}}, err => {
        if(err)
            res.status(500).send({msg: '修改失败\n' + err})
        else
            res.send({msg: '修改成功'})
    })
}

exports.del = (req, res) => {
    const {area, nodeId} = req.query

    res.setHeader('Content-Type', 'application/json')

    NodeInfo.remove({
        area,
        nodeId
    }, err => {
        if(err)
            res.status(500).send({msg: '删除失败\n' + err})
        else
            res.send({msg: '删除成功'})
    })
}