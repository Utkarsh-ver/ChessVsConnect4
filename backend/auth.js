const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://shubhkj275:skumarj275@nodetuts.dp8genc.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected'))
    .catch((err) => console.log(err));

exports.login = async (req,res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(402).json({
        message: "Username or Password not present",
      })
    }
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found (username or password incorrect)",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(req.body);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};