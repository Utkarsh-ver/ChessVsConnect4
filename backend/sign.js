// const User = require('./userData');
const mongoose = require('mongoose');

// async function handleUserSignup(req, res) {
//     const { roll, pwd, room } = req.body;
//     await User.create({
//         roll,
//         pwd,
//         room,
//     });
//     return res.render("home");
// }
const userSchema = new mongoose.Schema({
    // Define schema fields here
    roll: {
		type: String,
		required: true,
		unique: true,
	},
	pwd: {
		type: String,
		required: true,
	}
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

async function handleUserLogin(req,res) {
    roll = req.body.roll;
    pwd = req.body.pwd;
    // console.log("yaha aa raha hai")
    const user = await User.findOne({
        roll,
        pwd,
    });
    if(!user){
        res.render("login", {
            error: "Invalid Username or Password",
        });
    };

    return res.render("home");
}

module.exports = {
    handleUserLogin
}