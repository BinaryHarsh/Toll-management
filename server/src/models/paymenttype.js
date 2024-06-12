const {PAYMENTTYPE } = require('../config/tables');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(PAYMENTTYPE, {
        PAYMENTTYPE: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        DESCRIPTION: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        REPORT_STATUS: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        STATUS: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }
      }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
      });
    }