/**
 * Created by Alone on 2017/3/1.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account', {
        type: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        underscored: true,
        tableName: 't_account'
    });
};