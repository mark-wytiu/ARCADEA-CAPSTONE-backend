const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const router = express.Router();

const GAMES_FILE = path.join(__dirname, "..", "Data", "Allgames.json");

function readGames() {
	const gameData = fs.readFileSync(GAMES_FILE, "utf8");
	const parseData = JSON.parse(gameData);
	if (!Array.isArray(parseData)) {
		throw new Error("Games data must be a JSON array");
	}
	return parseData;
}

function writeGames(games) {
	fs.writeFileSync(GAMES_FILE, JSON.stringify(games), "utf8");
}

router.get("/", (_req, res, next) => {
	try {
		const games = readGames();
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
	} catch (err) {
		next(err);
	}
});

router.get("/:id", (req, res, next) => {
	try {
		const games1 = readGames();
		const singleGame = games1.find((game) => game.id == req.params.id);

		if (!singleGame) {
			return res.status(404).json({ error: "Game not found" });
		}

		res.json(singleGame);
	} catch (err) {
		next(err);
	}
});

router.post("/", (req, res, next) => {
	try {
		const newGame = {
			id: uniqid(),
			title: req.body.title,
			genre: req.body.genre,
			image: req.body.image || "",
			releaseDate: req.body.releaseDate,
			price: req.body.price ? req.body.price.toString() : "0",
			developer: req.body.developer || "",
			platforms: req.body.platform ? [req.body.platform] : [],
			description: req.body.description || "",
			publisher: req.body.publisher || "",
			rating: req.body.rating || 0,
		};

		const postGame = readGames();
		postGame.push(newGame);
		writeGames(postGame);

		res.status(201).json(newGame);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
