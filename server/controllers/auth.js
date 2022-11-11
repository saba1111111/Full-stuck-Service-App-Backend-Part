const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const sendingEmails = require("../helpers/sendingEmails");
exports.postSignUp = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       throw errors.array().map(e => e.msg);
    }
    try {
    const user = await User.findOne({email: email});
    if(user) {
        throw "Someone already regitred with this email, try again or reset pasword!";
    }
     const cryptPasswprd = await bcrypt.hash(password,12);
     const newUser = new User({email: email,password: cryptPasswprd,createdPersons: []});
     const saveNewUser = await newUser.save();
    res.json({user: saveNewUser})
   }catch(err) {
    next(err)
   }
}


exports.postLogin = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       throw errors.array().map(e => e.msg);
    }
    try {
       const user = await User.findOne({email: email});
       if(!user) {
        throw "No such person with this email!";
    }
    const passwordStatus = await bcrypt.compare(password,user.password);
    if(!passwordStatus) {
        throw "Invalid password!";
    }
    const token = jsonwebtoken.sign({userId: user._id.toString(),email: email},"MyTokenIsVerySafeDontTrySomthingBoolshitBySbs",{expiresIn: "1h"});
    res.json({message: "Sign In successfuly!",userId: user._id.toString(),token: token})
    }catch(err){
        next(err);
    }
}

exports.resetPaswordCheckEmail = async (req,res,next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            throw "There is not user with this email, try again!";
        }
        crypto.randomBytes(32, async (error,buffer)  => {
            if(error) {
                throw "Somthing happend, Try again!";
            }
            const token = buffer.toString("hex");
            user.resetToken = token;
            user.resetTokenExpiration =  Date.now() + 3600000;
           await user.save();
            sendingEmails(email,"Reset pasword!",`<p>Click this <a href="http://localhost:3000/resetPasword/${token}" target="_blank">to set a new password!</a></p>`)
            res.json({message: "sent link succesfully",email: email});
        })
    }catch(err) {
        next(err);
    }
   
}

exports.resetPasword = async (req,res,next) => {
    const token = req.params.token;
    const NewPassword = req.body.password;
    try {
    const user = await User.findOne({resetToken: token,resetTokenExpiration: {$gt: Date.now()}});
    if(!user) {
      throw("Failed to updated password, Try again!");
    }
    const hashedPassword = await bcrypt.hash(NewPassword,12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    
    await user.save();
    res.json({message: "Updated successfuly!"})
    
}catch(err) {
    next(err);
}
}