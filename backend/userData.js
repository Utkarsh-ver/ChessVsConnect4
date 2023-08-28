const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	roll: {
		type: String,
		required: true,
		unique: true,
	},
	pwd: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
	piece: {
		type: String,
	},
	score: {
		type: Number,
	},
	board: {
		type: String,
	},
	message: {
		type: String,
	},
	winner: {
		type: String,
	},
});

module.exports.User = mongoose.model("user", userSchema);
