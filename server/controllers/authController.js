import User from "../models/User.js";
import StatusCodes from "http-status-codes";
import {
  AuthenticationError,
  NotFoundError,
  BadRequestError,
} from "../errors/index.js";

const registerUser = async (req, res, next) => {
  const { email, password, name, role } = req.body;
  try {
    // Throws if fields are missing
    const user = await User.create(req.body);
    const token = user.createToken();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    //Pass to error handler
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Please enter all fields");

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User not found");

    const authorized = await user.checkPassword(password);
    if (authorized) {
      const token = user.createToken();
      res.status(StatusCodes.OK).json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } else {
      throw new AuthenticationError("User details incorrect");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res, next) => {
  // Update User
};

export { registerUser, loginUser, updateUser };
