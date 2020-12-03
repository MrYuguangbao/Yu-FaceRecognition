exports.formatDate = (value, type = 1) => {
    if(value==0){
        return ''
    }
    // console.log(rowData)
    var d = new Date(value * 1000)
    if (type == 1) {
        var a = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
    } else if (type == 2) {
        var a = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours())
    }
    // var a= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();              /*d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1*/

    // console.log(a)
    return a
};

exports.gobalEllisps = (value, length) => {
    if (!value) return ''
    if (value.length > length) {
        return value.slice(0, length) + '...'
    }
    return value
};