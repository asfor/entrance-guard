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

// 重置区域缓存
function resetArea(area, _cache) {
    return cache[area] = JSON.parse(JSON.stringify(init))
}

// 提取并重置缓存
function extractCache(req, res) {
    const area = req.params.area
    let result = cache[area]
    
    if(result)
        resetArea(area)
    else
        result = {}

    res.setHeader('Content-Type', 'application/json')
    res.send(result)
}

// 数据处理的高阶函数
function handle(cacheKey, model, uniqueKey) {
    return (req, res, next) => {
        const area = req.params.area
        const data = req.body[cacheKey]

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

        model.remove({
            area: area,
            [uniqueKey]: {$in: data.del}
        }, err => {
            if(err) console.error(area + ': ' + err)
        })

        next()
    }
}

module.exports = {cache, resetArea, extractCache, handle}