const Account = require('../models/Account');

// Create a new account
exports.createAccount = async (req, res) => {
    const { account_id, introducer_id } = req.body;

    try {
        if (!account_id || account_id.length > 50) {
            return res.status(400).json({ success: false, error: 'Invalid Account ID' });
        }

        const existingAccount = await Account.findByAccountId(account_id);
        if (existingAccount) {
            return res.status(400).json({ success: false, error: 'Account ID already exists' });
        }

        const totalAccounts = await Account.count();
        let beneficiary_id = '0';
        let final_introducer_id = '0';

        if (totalAccounts === 0) {
            // First account ever
            beneficiary_id = '0';
            final_introducer_id = '0';
        } else {
            if (!introducer_id || introducer_id.length > 50) {
                return res.status(400).json({ success: false, error: 'Invalid Introducer ID' });
            }

            const introducer = await Account.findByAccountId(introducer_id);

            if (introducer) {
                final_introducer_id = introducer_id;

                const introducerReferralCount = await Account.countByIntroducerId(introducer_id);

                if ((introducerReferralCount + 1) % 2 === 1) {
                    // Odd referral count
                    beneficiary_id = introducer_id;
                } else {
                    // Even referral count
                    const introducersIntroducer = await Account.findByAccountId(introducer.introducer_id);
                    if (introducersIntroducer) {
                        beneficiary_id = introducersIntroducer.beneficiary_id || '0';
                    } else {
                        beneficiary_id = '0';
                    }
                }
            }
        }

        const newAccount = await Account.create({
            account_id,
            introducer_id: final_introducer_id,
            beneficiary_id
        });

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            account: newAccount
        });

    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


// Get all accounts
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.json({
            success: true,
            accounts
        });
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching accounts'
        });
    }
}; 