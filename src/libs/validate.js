exports.isvalidName = (str)=> {
    const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/
    return reg.test(str)
}
exports.adduser = (str)=> {
    const reg = /^[a-zA-Z0-9]{1,20}$/
    return reg.test(str)
}
exports.addpassword = (str)=> {
    const reg = /^[a-zA-Z0-9]{1,20}$/
    return reg.test(str)
}
exports.ip = (str)=> {
    const reg = /^([0]|[1-9][0-9]{0,2})\.([0]|[1-9][0-9]{0,2})\.([0]|[1-9][0-9]{0,2})\.([0]|[1-9][0-9]{0,2})$/
    return reg.test(str)
}
exports.port = (str)=> {
    const reg = /^[2][4][0-9]{2}$/
    return reg.test(str)
}
exports.nodeorder = (str)=> {
    const reg = /^[1-9][0-9]{0,1}$/
    return reg.test(str)
}
exports.portorder = (str)=> {
    const reg = /^[2][4][0-9]{2}$/
    let arr = str.split('-')
    if(arr.length!=2){
        return false
    }else if(reg.test(arr[0])==false||reg.test(arr[1])==false){
        return false 
    }else if(Number(arr[0])>=Number(arr[1])){
        return false 
    }else {
        return true
    }
}
exports.agentpath = (str)=> {
    const reg = /^[a-zA-Z0-9]{1,10}$/
    return reg.test(str)
}

exports.pwd = (str)=> {
    const reg = /^[a-zA-Z0-9_]{1,20}$/
    return reg.test(str)
}
