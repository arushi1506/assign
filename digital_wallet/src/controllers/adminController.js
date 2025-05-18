const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');

const getFlaggedTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'flagged', isDeleted: false });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTotalBalances = async (req, res) => {
  try {
    const total = await Wallet.aggregate([
      { $match: {} },
      { $group: { _id: null, totalBalance: { $sum: '$balance' } } },
    ]);
    res.json({ totalBalance: total[0]?.totalBalance || 0 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const topUsers = await Wallet.find()
      .sort({ balance: -1 })
      .limit(5)
      .populate('userId', 'username');
    res.json(topUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFlaggedTransactions, getTotalBalances, getTopUsers };