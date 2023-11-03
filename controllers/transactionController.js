const { default: mongoose } = require("mongoose");
const Transaction = require("../models/transactionModel");

exports.getAllTransactions = async (req, res) => {
	try {
		const transations = await Transaction.find();
		res.status(200).json({
			status: "success",
			results: transations.length,
			data: {
				transations,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.getOneTransaction = async (req, res) => {
	try {
		const transactionId = new mongoose.Types.ObjectId(req.params.id)
		const transaction = await Transaction.findById(transactionId);
		if(!transactionId) {
			return res.status(404).json({
				status: "fail",
				data: `transaction id:${transactionId} not found`
			})
		}

		const cryptocurrency = await transaction.getCryptocurrency();
		res.status(200).json({
			status: "success",
			data: {
				transaction,
				cryptocurrency,
			},
		});
	} catch (error) {
		console.log(error)
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.createTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.create({
			...req.body,
			created_at: new Date(),
			updated_at: new Date(),
		});

		res.status(200).json({
			status: "success",
			data: {
				transaction,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: "fail",
		});
	}
};
