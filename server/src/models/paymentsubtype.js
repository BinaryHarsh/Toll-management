const {PAYMENTSUBTYPE } = require('../config/tables');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(PAYMENTSUBTYPE, {
        PAYMENTTYPE: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        PAYMENTSUBTYPE: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        DESCRIPTION: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        STATUS: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        REPORT_STATUS: {
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