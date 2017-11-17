'use strict';
exports.MailerType = [{
    id: 'Gmail',
    name: '谷歌邮箱',
    "domains": [
        "gmail.com",
        "googlemail.com"
    ]
}, {
    id: 'Hotmail',
    name: 'Hotmail',
    "domains": [
        "hotmail.com",
        "outlook.com"
    ]
}, {
    id: 'iCloud',
    name: 'iCloud',
    "domains": [
        "me.com",
        "mac.com"
    ]
}, {
    id: 'QQ',
    name: 'QQ',
    "domains": [
        "qq.com"
    ]
}, {
    id: 'QQex',
    name: '企业QQ',
    "domains": [
        "exmail.qq.com"
    ]
}, {
    id: 'SES',
    name: '亚马逊',
    "domains": [
        "amazonses.com"
    ]
}, {
    id: 'Yahoo',
    name: '雅虎',
    "domains": [
        "yahoo.com"
    ]
}, {
    id: '126',
    name: '网易126',
    "domains": [
        "126.com"
    ]
}, {
    id: '163',
    name: '网易163',
    "domains": [
        "163.com"
    ]
}, {
    id: 'qiye.aliyun',
    name: '企业阿里云'
}, {
    id: 'aliyun',
    name: '阿里云',
    "domains": [
        "aliyun.com"
    ]
}, {
    id: 'empty',
    name: '自定义'
}];
exports.MailerStatus = [{
    id: 0,
    name: '禁用'
}, {
    id: 1,
    name: '启用'
}];
exports.getAttribute = (dic, prop, value, isArray = false) => {
    let result = [];
    for (let item of dic) {
        if (item[prop] === value) {
            if (!isArray) return item;
            result.push(item);
        }
    }
    return isArray ? result : null;
};