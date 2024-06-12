const { admin_REPORTS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const admin_reports = sequelize.define(
    admin_REPORTS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: DataTypes.DATE,
      },
      to: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  admin_reports.associate = function (models) {
    admin_reports.hasMany(models.admin_report_links, { foreignKey: 'report_id' });
  };
  return admin_reports;
};
