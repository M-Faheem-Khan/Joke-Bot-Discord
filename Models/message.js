const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Schema for Message
const MsgSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true,
    },
    DateCreatd: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Message = mongoose.model("Message", MsgSchema);