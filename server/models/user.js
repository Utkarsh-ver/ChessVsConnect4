const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    roll: {
        type:String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true
    },
    winhistory:{
        type:[String],
    },
    movecount:{
        type:[Number],
    },
    playhistory:{
        type:[String],
    },
    opponenthistory:{
        type:[String],
    },
    inwaiting:{
        type:Boolean,
        default:true
    },
    roomNo:{
        type:String,
        default:null,
    },
    online:{
        type:Boolean,
        default:false
    },
    sockid:{
        type:String,
        default:'0'
    }
});

module.exports = mongoose.model("User",userSchema);