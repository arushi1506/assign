const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/flagged-transactions', authMiddleware, adminMiddleware, adminController.getFlaggedTransactions);
router.get('/total-balances', authMiddleware, adminMiddleware, adminController.getTotalBalances);
router.get('/top-users', authMiddleware, adminMiddleware, adminController.getTopUsers);

module.exports = router;