const { admin_REPORT_LINKS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const admin_report_links = sequelize.define(
    admin_REPORT_LINKS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      report_id: {
        type: DataTypes.NUMBER,
      },
      type_id: {
        type: DataTypes.NUMBER,
      },
      download_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  admin_report_links.associate = function (models) {
    admin_report_links.belongsTo(models.admin_master_reports, { foreignKey: 'type_id' });
  };
  return admin_report_links;
};
