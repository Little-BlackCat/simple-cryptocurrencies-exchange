const mongoose = require('mongoose');
const Cryptocurrency = require('./cryptocurrencyModel');

const transactionsSchema = new mongoose.Schema({
  type: { type: String }, // buy || sell
  amount: { type: Number }, // จำนวน Cypto
  price: { type: Number }, // ราคาต่อหน่วย
	source_wallet_id: { type: mongoose.Types.ObjectId, ref: 'users' },
	destination_wallet_id: { type: mongoose.Types.ObjectId, ref: 'users' },
  cryptocurrency_id: { type: mongoose.Types.ObjectId, ref: 'cyptocurrencies' },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Transaction = mongoose.model('transactions', transactionsSchema);

Transaction.prototype.getCryptocurrency = async function() {
  const cryptocurrency = await Cryptocurrency.findById(this.cryptocurrency_id);
  return cryptocurrency;
};

module.exports = Transaction;