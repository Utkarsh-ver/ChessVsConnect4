const User = require('./userData');
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
// const userSchema = new mongoose.Schema({
//     // Define schema fields here
//     roll: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	pwd: {
// 		type: String,
// 		required: true,
// 	}
//   });
  
//   const User = mongoose.model('User', userSchema);
  
//   module.exports = User;

async function handleUserLogin(req,res) {
    roll = req.body.roll;
    pwd = req.body.pwd;
    // console.log("yaha aa raha hai")
    const user = await User.findOne({
        roll,
        pwd,
    });
    if(!user){
        res.status(204).json({
            message: "Invalid Credentials",
        })
    }else {
        // console.log(res);
        console.log("hii")
        res.status(200).json({
            message: "Login successful",
            user,
          })
    }

    // return res.render("home");
}
async function handleUserget(req, res){
    try {
      const users = await User.find(req.body);
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


async function handleUserResult(req, res){
try {
    const result = await User.findOne({ roll: localStorage.roll });
    // const users = await User.find({
    // roll : localStorage.roll,
    // });
    // let response=0;
    const round = result.round;

    if(winner == "b" && round == "1"){
        result.round1_winner = "chess";
    } else if(winner == "w" && round == "1"){
        result.round1_winner = "connect4";
    }

    if(winner == "b" && round == "2"){
        result.round2_winner = "chess";
    } else if(winner == "w" && round == "2"){
        result.round2_winner = "connect4";
    }

    if(winner == "b" && round == "3"){
        result.round3_winner = "chess";
    } else if(winner == "w" && round == "3"){
        result.round3_winner = "connect4";
    }

    if(winner == "b" && round == "4"){
        result.round4_winner = "chess";
    } else if(winner == "w" && round == "4"){
        result.round4_winner = "connect4";
    }

    // console.log(users.round1_winner);
    // //users.winners.push(req.params.winner);
    // console.log(users);
    // res.status(201).json(users);

} catch (error) {
    res.status(400).json({ message: error.message });
}
};


module.exports = {
    handleUserLogin,
    handleUserget,
    handleUserResult
}