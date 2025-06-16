const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Create a new account
router.post('/accounts', accountController.createAccount);

// Get all accounts
router.get('/accounts', accountController.getAllAccounts);

module.exports = router; 