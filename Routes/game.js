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


router.get("/:id", (req, res) => {
	const games1 = readGame();
	const singleGame = games1.find(
		(game) => game.id == req.params.id
	);

	res.json(singleGame);
});



router.post("/", (req, res) => {
    console.log(req.body)
	const newGame = {
		id: uniqid(),
		title: req.body.title,
		genre: req.body.genre,
		platforms: req.body.platforms,
	};

	const postGame = readGame();
	postGame.push(newGame);
	fs.writeFileSync("./Data/Allgames.json", JSON.stringify(postGame));

	res.status(201).json(newGame);
});

module.exports = router;
