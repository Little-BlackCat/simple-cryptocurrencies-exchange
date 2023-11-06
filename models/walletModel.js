const mongoose = require("mongoose");
const WalletCryptocurrency = require("./walletCryptocurrencyModel");

const walletsSchema = new mongoose.Schema({
	balance: { type: Number, default: 0 },
	user_id: { type: mongoose.Types.ObjectId, ref: "users" },
	created_at: { type: Date },
	updated_at: { type: Date },
});

const Wallets = mongoose.model("wallets", walletsSchema);

Wallets.prototype.getWalletCryptocurrency = async function () {
	const wallet = await WalletCryptocurrency.find({ wallet_id: this._id });
	return wallet;
};

module.exports = Wallets;
