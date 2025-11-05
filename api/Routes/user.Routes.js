const upload = require("../config/multer.config");
const { updateUser, deleteUser } = require("../Controllers/user.controller");
const verifyToken = require("../utils/verifyToken");

const userRouter = require("express").Router();

userRouter.post(
  "/update",
  verifyToken,
  upload.single("profileImage"),
  updateUser
);

userRouter.delete("/delete", verifyToken, deleteUser);

module.exports = userRouter;
