const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
	.route("/")
	.get(transactionController.getAllTransactions)
	.post(transactionController.createTransaction)

router
	.route("/:id")
	.get(transactionController.getOneTransaction)

module.exports = router;
