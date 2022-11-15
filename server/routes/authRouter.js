import express from "express";
import checkToken from "../middleware/authHandler.js";
import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginUser);

authRouter.route("/updateUser").patch(checkToken, updateUser);

export default authRouter;
