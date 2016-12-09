function toFormData(obj) {
    if(typeof obj !== 'object')
        throw new TypeError('Param must be a object.')

    let result = []

    for(const key of Object.keys(obj))
        result.push(`${key}=${obj[key]}`)

    return result.join('&')
}

export {toFormData}