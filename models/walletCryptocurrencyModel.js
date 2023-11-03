const mongoose = require('mongoose');
const Wallets = require("./walletModel");

const walletCryptocurrencySchema = new mongoose.Schema({
  cryptocurrency_amount: { type: Number },
	wallet_id: { type: mongoose.Types.ObjectId, ref: 'wallets' },
	cryptocurrency_id: { type: mongoose.Types.ObjectId, ref: 'cryptocurrencies' },
});

const WalletCryptocurrency = mongoose.model('walletCryptocurrencies', walletCryptocurrencySchema);

WalletCryptocurrency.prototype.getWallet = async function() {
  const wallet = await Wallets.findById(this.wallet_id);
  return wallet;
};

module.exports = WalletCryptocurrency;