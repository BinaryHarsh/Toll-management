const { TBL_FARE_MASTER } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const tbl_fare_master = sequelize.define(
    TBL_FARE_MASTER,
    {
      FARE_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      PLAZA_ENTRY: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      PLAZA_EXIT: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      VEH_CLASS: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TOLL_FARE: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false,
      },
      OW_FARE: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false,
      },
      PAY_TYPE: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      PAY_SUB_TYPE: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      ACTIVE_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      INACTIVE_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ENCODED_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      STATUS: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IS_ACTIVE: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  return tbl_fare_master;
};
