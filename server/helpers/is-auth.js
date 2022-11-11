const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");
exports.isAuth = async (req,res,next) => {
    console.log(req.body);
    const {token,expireDate,userId} = req.body.auth;
    let tokenVerify;
    if(!token || !expireDate || !userId) {
        next("Error! Try again, make sure you are sign in!");
    }
    try {
    const user = await User.findById(userId);
    if(!user) {
        throw("No Such User!");
    }
   tokenVerify = await jsonWebToken.verify(token,'MyTokenIsVerySafeDontTrySomthingBoolshitBySbs');
    }catch(err) {
      next(err);
    }
    if(new Date() >= new Date(expireDate) || !tokenVerify) {
        next("Error, somthhig happend, make sure you are sign in!");
    }
    next();
};