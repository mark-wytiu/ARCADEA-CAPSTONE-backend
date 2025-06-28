const express = require("express");
const app = express();
const gameRoutes = require("./Routes/game.js");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5051;
console.log(process.env.PORT);

// Configure CORS for production
const corsOptions = {
	origin: process.env.FRONTEND_URL || "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK" });
});

// app.use("/static-files", express.static("public"));

app.use("/games", gameRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// Handle 404 routes
app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
