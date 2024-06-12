const { TBL_SLAVE_TRANS } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
  const tbl_slave_trans = sequelize.define(
    TBL_SLAVE_TRANS,
    {
      LANE_TRANS_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      PLAZA_CODE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      API_TRANS_ID: {
        type: DataTypes.STRING,
      },
      LANE_ID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LANE_TYPE: {
        type: DataTypes.STRING,
      },
      OPERATOR_ID: {
        type: DataTypes.STRING,
      },
      DIRECTION: {
        type: DataTypes.STRING,
      },
      SHIFT_CODE: {
        type: DataTypes.STRING,
      },
      PASSAGE_TIME: {
        type: DataTypes.DATE,
      },
      TAG: {
        type: DataTypes.STRING,
      },
      TAG_TID: {
        type: DataTypes.STRING,
      },
      PAN: {
        type: DataTypes.STRING,
      },
      TAG_PLATE: {
        type: DataTypes.STRING,
      },
      VEH_PLATE: {
        type: DataTypes.STRING,
      },
      TAG_CLASS: {
        type: DataTypes.NUMERIC(4, 0),
      },
      VEH_CLASS: {
        type: DataTypes.NUMERIC(4, 0),
      },
      AVC_CLASS: {
        type: DataTypes.NUMERIC(4, 0),
      },
      WEIGHT: {
        type: DataTypes.STRING,
      },
      PAYMENT_TYPE: {
        type: DataTypes.STRING,
      },
      PAYMENT_SUBTYPE: {
        type: DataTypes.STRING,
      },
      CLASS_FARE: {
        type: DataTypes.NUMERIC(4, 0),
      },
      PENALTY_FARE: {
        type: DataTypes.NUMERIC(4, 0),
      },
      OW_FARE: {
        type: DataTypes.NUMERIC(4, 0),
      },
      TOTAL_FARE: {
        type: DataTypes.NUMERIC(4, 0),
      },
      OPERATOR_COMMENT: {
        type: DataTypes.STRING,
      },
      ABNORMALITY: {
        type: DataTypes.STRING,
      },
      VEH_IMG_OCR: {
        type: DataTypes.STRING,
      },
      PLATE_IMG_OCR: {
        type: DataTypes.STRING,
      },
      REVIEWER_ID: {
        type: DataTypes.STRING,
      },
      RE_VEH_PLATE: {
        type: DataTypes.STRING,
      },
      RE_VEH_CLASS: {
        type: DataTypes.NUMERIC(4, 0),
      },
      RE_VEH_FEE: {
        type: DataTypes.DECIMAL(4, 0),
      },
      RE_TIME: {
        type: DataTypes.DATE,
      },
      RE_PAYMENT_TYPE: {
        type: DataTypes.STRING,
      },
      RE_PAYMENT_SUBTYPE: {
        type: DataTypes.STRING,
      },
      RE_COMMENT: {
        type: DataTypes.STRING,
      },
      RE_STATUS: {
        type: DataTypes.BOOLEAN,
      },
      CASHIER_ID: {
        type: DataTypes.STRING,
      },
      CS_COMMENT: {
        type: DataTypes.STRING,
      },
      CS_REVIEW_TIME: {
        type: DataTypes.DATE,
      },
      MODE: {
        type: DataTypes.STRING,
      },
      BLACKLIST: {
        type: DataTypes.BOOLEAN,
      },
      IS_SAME_DIR: {
        type: DataTypes.BOOLEAN,
      },
      PRO_STATUS: {
        type: DataTypes.BOOLEAN,
      },
      CATEGORY: {
        type: DataTypes.STRING,
      },
      ENCODED_DATE: {
        type: DataTypes.DATE,
      },
      TAG_DETAILS_STATUS: {
        type: DataTypes.BOOLEAN,
      },
      API_TRANS_STATUS: {
        type: DataTypes.BOOLEAN,
      },
      VALID_ID: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      OW_DISPUTED: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
    }
  );
  tbl_slave_trans.associate = (models) => {
    tbl_slave_trans.belongsTo(models.TBL_MASTER_CLASS, { foreignKey: 'VEH_CLASS', as: 'VEH' });
    tbl_slave_trans.belongsTo(models.TBL_MASTER_CLASS, { foreignKey: 'RE_VEH_CLASS', as: 'REVEH' });
    tbl_slave_trans.belongsTo(models.TBL_MASTER_CLASS, { foreignKey: 'AVC_CLASS', as: 'AVC' });
    tbl_slave_trans.belongsTo(models.PAYMENTSUBTYPE, {
      foreignKey: 'PAYMENT_SUBTYPE',
      targetKey: 'PAYMENTSUBTYPE',
      as: 'PAYSUB',
    });
    tbl_slave_trans.belongsTo(models.PAYMENTTYPE, { foreignKey: 'PAYMENT_TYPE', targetKey: 'PAYMENTTYPE', as: 'PAY' });
  };
  return tbl_slave_trans;
};
