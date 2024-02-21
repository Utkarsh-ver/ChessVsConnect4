const User = require('../models/user');
const mongoose = require('mongoose');
const waitingroom = require('../models/waitingroom')

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find(req.body);
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.getWaitingroom = async (req, res) => {
    try {
      const waitingroom = await waitingroom.find();
      res.status(201).json(waitingroom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };