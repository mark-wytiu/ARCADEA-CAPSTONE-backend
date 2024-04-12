const express = require("express");
const app = express();
const gameRoutes = require("./Routes/game.js");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5051;
console.log(process.env.PORT);

app.use(cors());

app.use(express.json());

// app.use("/static-files", express.static("public"));

app.use("/games", gameRoutes);



app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
