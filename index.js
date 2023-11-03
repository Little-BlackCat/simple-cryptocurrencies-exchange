const express = require("express");
const mongoose = require("mongoose");
const connectWithRetry = require("./utils/database");
const seed = require("./seed")

const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");
const transactionRoute = require("./routes/transactionRoute");
const cryptocurrencyRoute = require("./routes/cryptocurrencyRoute");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
connectWithRetry();
// seed();

app.get("/", (req, res) => {
	res.send("<h1>Hello Wolrd!!!</h1>");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", walletRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/cryptocurrencies", cryptocurrencyRoute);

app.listen(port, () => console.log(`Start server port: ${port}`));
