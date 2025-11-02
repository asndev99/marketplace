const User = require("../Models/userModel");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        await newUser.save();
        return res.status(201).json('User Created Successfully');
    }
    catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
        console.log("Signin Body Payload", req.body);
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "User Not Found"));
        }

        const isPasswordMatched = await bcrypt.compare(password, validUser.password);
        if (!isPasswordMatched) {
            return next(errorHandler(401, "Invalid Password"));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);


    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin
}