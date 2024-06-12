const { admin_USER_SHIFT_MAPPINGS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    admin_USER_SHIFT_MAPPINGS,
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.NUMBER,
      },
      shift_id: {
        type: DataTypes.NUMBER,
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
};
