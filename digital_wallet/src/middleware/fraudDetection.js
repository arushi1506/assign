const Transaction = require('../models/Transaction');

const fraudDetectionMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  const { amount, type } = req.body;

  // Rule 1: Flag large withdrawals (> $1000)
  if (type === 'withdraw' && amount > 1000) {
    console.log(`Fraud Alert: Large withdrawal of ${amount} by user ${userId}`);
    // Mock email alert (Bonus)
    console.log(`[Mock Email] Suspicious withdrawal of ${amount} detected for user ${userId}`);
  }

  // Rule 2: Flag multiple transfers within 1 minute
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recentTransfers = await Transaction.find({
    userId,
    type: 'transfer',
    createdAt: { $gte: oneMinuteAgo },
  });

  if (recentTransfers.length >= 3) {
    console.log(`Fraud Alert: Multiple transfers detected for user ${userId}`);
    // Flag transaction
    req.fraudFlag = true;
  }

  next();
};

module.exports = fraudDetectionMiddleware;