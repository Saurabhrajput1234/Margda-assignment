const sequelize = require('../config/db');
const AccountSchema = require('./schema');


const Account = sequelize.define('Account', AccountSchema, {
    tableName: 'accounts',
    timestamps: false
});

// Add custom methods to the model
Account.findByAccountId = async function(accountId) {
    return await this.findOne({ where: { account_id: accountId } });
};

Account.countByIntroducerId = async function(introducerId) {
    return await this.count({ where: { introducer_id: introducerId } });
};

// Initialize database
const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await Account.sync();
        console.log('Account table synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


initDatabase();

module.exports = Account; 