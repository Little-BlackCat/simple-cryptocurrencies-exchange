const express = require("express");
const connectWithRetry = require("./utils/database");
const seed = require("./seed");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-docs/swagger.json");
const cors = require('cors');

const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");
const transactionRoute = require("./routes/transactionRoute");
const cryptocurrencyRoute = require("./routes/cryptocurrencyRoute");
const walletCryptocurrencyRoute = require('./routes/walletCryptocurrencyRoute')

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
connectWithRetry();
// seed(); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
	// #swagger.tags = ["Testing"]
	// #swagger.summary = "Test API"
	// #swagger.description = "Test API before use another."
	res.send("<h1>Hello Wolrd!!!</h1>");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/wallets", walletRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/cryptocurrencies", cryptocurrencyRoute);
app.use("/api/v1/wallet_cryptocurrency", walletCryptocurrencyRoute);

app.listen(port, () => console.log(`Start server port: ${port}`));
