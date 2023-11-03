const mongoose = require("mongoose");
const {
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_PORT,
	MONGO_IP,
} = require("../config/config");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
	mongoose
		.connect(mongoURL)
		.then(() => console.log("Successfully connected to DB"))
		.catch((e) => {
			console.log(e);
			setTimeout(connectWithRetry, 5000);
		});
};

module.exports = connectWithRetry;
