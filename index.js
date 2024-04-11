const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

function readGame() {
	const gameData = fs.readFileSync("./Data/Allgames.json");
	const parseData = JSON.parse(gameData);
	return parseData;
}

router.get("/", (_req, res) => {
	const games = readGame();
	const listOfGames = games.map((game) => {
		return {
			id: game.id,
			title: game.title,
			genre: game.genre,
			image: game.image,
			developer: game.developer,
			platforms: game.platforms,
			description: game.description,
		};
	});
	res.json(listOfGames);
});


router.get("/game/:id", (req, res) => {
	const games1 = readGame();
	const singleGame = games1.find(
		(game) => game.id === req.params.gameId
	);

	res.json(singleGame);
});



router.post("/", (req, res) => {
	const newGame = {
		id: uniqid(),
		title: req.body.title,
		description: req.body.description,
	};

	const postVideo = readData();
	postVideo.push(newVideo);
	fs.writeFileSync("./data/video.json", JSON.stringify(postVideo));

	res.status(201).json(newVideo);
});

module.exports = router;
