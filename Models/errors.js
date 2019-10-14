const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Schema for Message
const ErrorsSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    error: {
        type: Object,
        required: true,
    },
    DateCreatd: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Errors = mongoose.model("Errors", ErrorsSchema);