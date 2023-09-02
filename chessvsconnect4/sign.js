const User = require('./userData');
const mongoose = require('mongoose');

async function handleUserLogin(req,res) {
    const roll = req.body.roll;
    const pwd = req.body.pwd;
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
        // console.log("hii")
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

module.exports = {
    handleUserLogin,
    handleUserget,
}