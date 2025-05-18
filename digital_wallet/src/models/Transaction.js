const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
  amount: { type: Number, required: true, min: 0 },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For transfers
  status: { type: String, enum: ['completed', 'pending', 'flagged'], default: 'completed' },
  isDeleted: { type: Boolean, default: false }, // Soft delete
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);