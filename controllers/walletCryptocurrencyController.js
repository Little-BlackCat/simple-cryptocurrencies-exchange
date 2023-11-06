const mongoose = require("mongoose");
const WalletCryptocurrency = require("../models/walletCryptocurrencyModel")

exports.getAllWalletCryptocurrency = async (req, res) => {
	// #swagger.tags = ["WalletCryptocurrencies"]
	// #swagger.summary = "Get all WalletCryptocurrencies"
	try {
		const walletCryptocurrency = await WalletCryptocurrency.find();
		res.status(200).json({
			status: "success",
			results: walletCryptocurrency.length,
			data: {
				walletCryptocurrency,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.getOneWallCryptocurrency = async (req, res) => {
	// #swagger.tags = ["WalletCryptocurrencies"]
	// #swagger.summary = "Get WalletCryptocurrency by id"
	try {
		const walletCryptocurrency = await WalletCryptocurrency.findById(req.params.id);
		res.status(200).json({
			status: "success",
			results: walletCryptocurrency.length,
			data: {
				walletCryptocurrency,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};