const jwt = require("jsonwebtoken");

exports.generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.cookie("token", token, {
        maxAge: 1*60*60*1000, //in miliseconds
        httpOnly: true, //prevents XSS attacks cross-site scripting attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })

    return token;
}