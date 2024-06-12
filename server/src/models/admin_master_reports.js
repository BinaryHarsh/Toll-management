const { admin_MASTER_REPORTS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const admin_master_reports = sequelize.define(
    admin_MASTER_REPORTS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      report_name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );

  return admin_master_reports;
};
