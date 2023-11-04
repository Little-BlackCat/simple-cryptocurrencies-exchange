const { default: mongoose } = require("mongoose");
const Cryptocurrency = require("../models/cryptocurrencyModel");

exports.getAllCryptocurrencies = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Get all Cryptocurrencies"
	try {
		const cryptocurrencies = await Cryptocurrency.find();
		res.status(200).json({
			status: "success",
			results: cryptocurrencies.length,
			data: {
				cryptocurrencies,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.getOneCryptocurrency = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Get Cryptocurrency by id"
	const cryptocurrencyId = new mongoose.Types.ObjectId(req.params.id);
	try {
		const cryptocurrency = await Cryptocurrency.findById(cryptocurrencyId);
		if (!cryptocurrencyId) {
			return res.status(404).json({
				status: "fail",
				data: `transaction id:${cryptocurrencyId} not found`,
			});
		}

		res.status(200).json({
			status: "success",
			data: {
				cryptocurrency,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.createCryptocurrency = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Create Cryptocurrency"
	const { name, symbol, current_price } = req.body;
	try {
		const cryptocurrency = await Cryptocurrency.create({
			name,
			symbol,
			current_price,
		});
		res.status(200).json({
			status: "success",
			data: {
				cryptocurrency,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.createCryptocurrencyMany = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Create many Cryptocurrencies"
	try {
		const cryptocurrencies = await Cryptocurrency.insertMany(req.body);
		res.status(200).json({
			status: "success",
			data: {
				cryptocurrencies,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.deleteCryptocurrency = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Delete Cryptocurrency by id"
	try {
		const cryptocurrency = await Cryptocurrency.findById(req.params.id);
		if (!cryptocurrency) {
			return res.status(404).json({
				status: "fail",
				data: "id not found",
			});
		}
		await Cryptocurrency.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.deleteCryptocurrenciesMany = async (req, res) => {
	// #swagger.tags = ["Cryptocurrencies"]
	// #swagger.summary = "Delete many Cryptocurrencies"
	try {
		await Cryptocurrency.deleteMany();
		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};
