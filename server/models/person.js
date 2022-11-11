const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
    PersonalNumber: {
        required: true,
        type: Number
    },
    age: {
        required: true,
        type: Number
    },
    city: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    profesion: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    creator: {
        required: true,
        type: Schema.Types.ObjectId
    }
},{timestamps: true});

module.exports = mongoose.model("Person",personSchema);