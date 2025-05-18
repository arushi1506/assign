const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { authMiddleware } = require('../middleware/auth');
const fraudDetectionMiddleware = require('../middleware/fraudDetection');

router.post('/deposit', authMiddleware, fraudDetectionMiddleware, walletController.deposit);
router.post('/withdraw', authMiddleware, fraudDetectionMiddleware, walletController.withdraw);
router.post('/transfer', authMiddleware, fraudDetectionMiddleware, walletController.transfer);
router.get('/transactions', authMiddleware, walletController.getTransactionHistory);

module.exports = router;