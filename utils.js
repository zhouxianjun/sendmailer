'use strict';
const util = require('util');
const nodemailer = require('nodemailer');
const logger = require('tracer-logger');
class Utils {
    static async verifyMailer(option) {
        try {
            let transporter = nodemailer.createTransport(Object.assign({logger}, option));
            return await util.promisify(transporter.verify).apply(transporter);
        } catch (e) {
            console.error(e.stack);
            return false;
        }
    }
}
module.exports = Utils;