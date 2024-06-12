const { admin_MASTER_ROLES } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const adminMasterRoles = sequelize.define(
    admin_MASTER_ROLES,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  adminMasterRoles.associate = function (models) {
    adminMasterRoles.hasMany(models.admin_role_module_mappings, { foreignKey: 'role_id' })
  };
  return adminMasterRoles;
};
