const {TBL_MASTER_CLASS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const   tbl_master_class = sequelize.define(TBL_MASTER_CLASS, {
    CLASS_NO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CLASS_DESCRIPTION: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SEL_KEY: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    ENCODED_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    CLASS_STATUS: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ALLOWED_SPEED: {
      type: DataTypes.DECIMAL(4, 0),
      allowNull: true,
    },
    ANPR_CLASS: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    IMAGE: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    TAG_CLASS: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
  sequelize,
  timestamps: false,
  freezeTableName: true,
});
return tbl_master_class
}