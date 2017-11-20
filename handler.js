const Utils = require('./utils');
class Handler {
    static async verifyMailer(option) {
        let res = await Utils.verifyMailer(option);
        console.log(res);
    }
}
module.exports = Handler;