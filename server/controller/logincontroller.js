const User = require('../models/user');
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

module.exports = handleUserLogin;