const User = require("../Models/userModel");


const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(201).json('User Created Successfully');
    }
    catch (error) {
        next(error);
    }

}

module.exports = {
    signup
}