const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const cloudinary = require("../config/cloudinary.config");

const updateUser = async (req, res, next) => {
  try {
    let updatedPayload = {};
    if (req.file) {
      const imageUrl = await _uploadToCloudinary(req.file.buffer);
      updatedPayload.avatar = imageUrl;
    }

    if (req.body.username) {
      updatedPayload.username = req.body.username;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedPayload.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedPayload },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log("Error in updating user", error);
    next(error);
  }
};

const _uploadToCloudinary = (fileBuffer, folderName = "profile") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folderName }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

module.exports = {
  updateUser,
};
