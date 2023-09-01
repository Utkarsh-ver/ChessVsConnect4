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
	round1_room: {
		type: String,
		required: true,
	},
	round2_room: {
		type: String,
	},
	round3_room: {
		type: String,
	},
	round4_room: {
		type: String,
	},
	score:{
		type:Number,
		required:true,
	},
	board:{
		type:String,
		// required:true,
	},
	count_moves:{
		type:Number,
		required:true,
	},
	winner:{
		type:Array,
		required:true,
	},
	userTurn:{
		type: String,
	},
});

// module.exports.User = mongoose.model("User", userSchema);

const User = mongoose.model('User', userSchema);
  
module.exports = User;
