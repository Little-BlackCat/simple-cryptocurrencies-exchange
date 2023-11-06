const mongoose = require("mongoose");
const Wallets = require("./walletModel");

const usersSchema = new mongoose.Schema({
	username: { type: String, unique: true },
  email: { type: String, unique: true },
  phone_number: { type: String, unique: true },
  created_at: { type: Date },
  updated_at: { type: Date },
})

const User = mongoose.model('users', usersSchema);

// Method getWallet
User.prototype.getWallet = async function() {
  // Find user's wallet
  const wallet = await Wallets.find({
    user_id: this._id,
  });

  return wallet;
}

module.exports = User; 