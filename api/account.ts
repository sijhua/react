import request from './request'

export function submitCompanBasicInfo(data:Object) {
    return request({
        url: '/CompanBasicInfo',
        method: 'post',
        data
    })
}