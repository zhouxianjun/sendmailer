'use strict';
const nodemailer = require('nodemailer');
const wellknown = require('nodemailer-wellknown');
const logger = require('tracer-logger');
const util = require('util');
console.log(wellknown('qq'));
console.log(wellknown('gmail'));
console.log(wellknown('Outlook'));
console.log(wellknown('QQex'));
console.log(wellknown('yahoo'));
console.log(wellknown('126'));
console.log(wellknown('qiye.aliyun'));
/*
let transporter = nodemailer.createTransport(Object.assign({logger}, {
    host: 'smtp.aliyun.com',
    port: 25,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'berrybao1992@aliyun.com',
        pass: 'woaini1992523'
    }
}));
(async () => {
    try {
        let res = await util.promisify(transporter.verify).apply(transporter);
        console.log(res);
    } catch (e) {
        console.error(e.stack);
    }
})();*/
