const { admin_CASHUP_DENOMINATION } = require('../config/tables');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        admin_CASHUP_DENOMINATION,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cashup_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'admin_cashup', // Assuming the table name is 'admin_cashup'
                    key: 'id',
                },
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            cashup_method: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            denomination_amount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            total_amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            tc_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            cashier_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
    }
    );
};