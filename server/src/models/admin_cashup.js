const { admin_CASHUP } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        admin_CASHUP,
        {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            shift: {
                type: DataTypes.STRING,
            },
            tc_id: {
                type: DataTypes.INTEGER,
            },
            cashier_id: {
                type: DataTypes.INTEGER,
            },
            role_id: {
                type: DataTypes.INTEGER,
            },
            cashup_amount: {
                type: DataTypes.DECIMAL(10, 2),
            },
            status: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
        }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    });

};