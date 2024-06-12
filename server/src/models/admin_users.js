const { admin_USERS, admin_LOGINS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const adminUsers = sequelize.define(
    admin_USERS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.NUMBER,
      },
      shift_id: {
        type: DataTypes.NUMBER,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      email: {
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

  adminUsers.associate = function (models) {
    adminUsers.hasOne(models.admin_logins, { foreignKey: 'user_id' });
  };

  return adminUsers;
};
