const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    createdPersons: {
        type: [{type: Schema.Types.ObjectId,ref: "Person"}],
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("User",userSchema);