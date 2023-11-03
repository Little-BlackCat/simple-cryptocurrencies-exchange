const mongoose = require('mongoose');

const walletsSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
	user_id: { type: mongoose.Types.ObjectId, ref: 'users' },
	created_at: { type: Date },
  updated_at: { type: Date },
});

const Wallets = mongoose.model('wallets', walletsSchema);
module.exports = Wallets;