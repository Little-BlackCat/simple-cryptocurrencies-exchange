const mongoose = require('mongoose');

const cryptocurrenciesSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  symbol: { type: String, unique: true },
	current_price: { type: Number },
});

const Cryptocurrency = mongoose.model('cryptocurrencies', cryptocurrenciesSchema);
module.exports = Cryptocurrency;
