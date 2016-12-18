const crypto = require('crypto')
const Area = require('./db/area')
const {secret, IPLockTime} = require('../config')

// IP映射表
let mapTable = {}

// 缓存对象
const cache = {}

const init = {
    nodeInfo: {
        set: [],
        del: []
    },

    userInfo: {
        set: [],
        del: []
    },

    userPermission: {
        add: [],
        del: []
    }
}

// 定时清理IP映射绑定，从应用启动时算起
setInterval(() => mapTable = {}, IPLockTime * 60 * 60 * 1000)

// 加密函数，采用 sha256 散列算法和 hex 编码
function encrypt(value) {
    return crypto
        .createHmac('sha256', secret)
        .update(value)
        .digest('hex')
}

// 重置区域缓存
function resetArea(area, _cache) {
    return cache[area] = JSON.parse(JSON.stringify(init))
}

// 提取并重置缓存
function extractCache(req, res) {
    const {area, secret} = req.params
    let result = cache[area]

    if(result)
        Area.findOne({no: area}, (err, doc) => {
            if(err)
                res.status(500).send({msg: '数据库查询错误\n' + err})

            if(encrypt(secret) === doc.key) {
                resetArea(area)
                res.setHeader('Content-Type', 'application/json')
                res.send(result)
            } else
                res.status(403).send({msg: '密钥验证失败'})
        })
    else
        res.status(200).send({})
}

// IP映射查询
function mapQuery(ip) {
    return mapTable[ip]
}

// IP映射绑定
function mapBind(ip, area) {
    if(mapQuery(ip))
        return false

    mapTable[ip] = area
    return true
}

// 数据处理的高阶函数
function handle(cacheKey, model, uniqueKey) {
    return (req, res, next) => {
        const area = req.params.area
        const data = req.body[cacheKey]

        if(!data)   return next()

        if(data.add) {
            data.add.forEach((doc, index) => data.add[index].area = area)
            model.create(data.add)
        }

        if(data.set) {
            data.set.forEach(doc => {
                model.update({
                    area: area,
                    [uniqueKey]: doc[uniqueKey]
                }, {$set: doc.content}, err => {
                    if(err) console.error(area + ': ' + err)
                })
            })
        }

        if(data.del)
            model.remove({
                area: area,
                [uniqueKey]: {$in: data.del}
            }, err => {
                if(err) console.error(area + ': ' + err)
            })

        next()
    }
}

module.exports = {
    cache,
    resetArea,
    extractCache,
    handle,
    encrypt,
    mapQuery,
    mapBind
}