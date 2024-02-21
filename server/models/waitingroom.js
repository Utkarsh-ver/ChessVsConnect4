const mongoose = require("mongoose");
const schema = mongoose.Schema;

const waitingroom = new schema({
    checker:[String],
    chess:[String]
});

module.exports = mongoose.model("waitingroom",waitingroom);