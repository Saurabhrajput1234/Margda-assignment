const { DataTypes } = require('sequelize');

const AccountSchema = {
    account_id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    introducer_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    beneficiary_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
};

module.exports = AccountSchema; 