const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

const deposit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount } = req.body;
    if (amount <= 0) throw new Error('Invalid deposit amount');

    let wallet = await Wallet.findOne({ userId: req.user.id }).session(session);
    if (!wallet) {
      wallet = new Wallet({ userId: req.user.id });
    }
    wallet.balance += amount;
    await wallet.save({ session });

    const transaction = new Transaction({
      userId: req.user.id,
      type: 'deposit',
      amount,
      status: req.fraudFlag ? 'flagged' : 'completed',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    res.json({ message: 'Deposit successful', balance: wallet.balance });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const withdraw = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount } = req.body;
    if (amount <= 0) throw new Error('Invalid withdrawal amount');

    const wallet = await Wallet.findOne({ userId: req.user.id }).session(session);
    if (!wallet || wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }
    wallet.balance -= amount;
    await wallet.save({ session });

    const transaction = new Transaction({
      userId: req.user.id,
      type: 'withdraw',
      amount,
      status: req.fraudFlag ? 'flagged' : 'completed',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    res.json({ message: 'Withdrawal successful', balance: wallet.balance });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { recipientId, amount } = req.body;
    if (amount <= 0) throw new Error('Invalid transfer amount');

    const senderWallet = await Wallet.findOne({ userId: req.user.id }).session(session);
    const recipientWallet = await Wallet.findOne({ userId: recipientId }).session(session);

    if (!senderWallet || senderWallet.balance < amount) {
      throw new Error('Insufficient funds');
    }
    if (!recipientWallet) {
      throw new Error('Recipient wallet not found');
    }

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;
    await senderWallet.save({ session });
    await recipientWallet.save({ session });

    const transaction = new Transaction({
      userId: req.user.id,
      type: 'transfer',
      amount,
      recipientId,
      status: req.fraudFlag ? 'flagged' : 'completed',
    });
    await transaction.save({ session });

    await session.commitTransaction();
    res.json({ message: 'Transfer successful', balance: senderWallet.balance });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id, isDeleted: false });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { deposit, withdraw, transfer, getTransactionHistory };