'use strict';
const nodemailer = require('nodemailer');
const logger = require('tracer-logger');
class Utils {
    static verifyMailer(option) {
        return new Promise((success, fail) => {
            try {
                let transporter = nodemailer.createTransport(Object.assign({logger}, option));
                transporter.verify((error, status) => {
                    error && fail(error);
                    error || success(status);
                });
            } catch (e) {
                console.error(e.stack);
                fail(e);
            }
        });
    }
    static decorate(fn) {
        return async (event, ...args) => {
            let result = await Reflect.apply(fn, fn, args);
            if (result !== undefined) event.returnValue = result;
        };
    }
}
module.exports = Utils;