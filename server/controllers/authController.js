import User from '../models/User.js';
import StatusCodes from 'http-status-codes';
import {
  AuthenticationError,
  NotFoundError,
  BadRequestError,
} from '../errors/index.js';

const registerUser = async (req, res, next) => {
  const { email, password, name, role } = req.body;
  try {
    // Throws if fields are missing or email duplicated
    const user = await User.create(req.body);
    const token = user.createToken();
    res.status(StatusCodes.CREATED).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
    /**
     * returns user: {
     *  userId: 5e63c3a5e4232e4cd0274ac2,
        name: Sam Jones,
        email: sam@gmail.com,
        role: user,
        createdAt: 2022-11-12T09:44:21Z ,
     * },
        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
     */
  } catch (error) {
    //Pass to error handler
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError('Please enter all fields');

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError('User not found');

    const authorized = await user.checkPassword(password);
    if (authorized) {
      const token = user.createToken();
      res.status(StatusCodes.OK).json({
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
      /**
     * returns user: {
     *  userId: 5e63c3a5e4232e4cd0274ac2,
        name: Sam Jones,
        email: sam@gmail.com,
        role: user
     * },
     * token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
     */
    } else {
      throw new AuthenticationError('Invalid user details');
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email, userId } = req.body;

    const user = await User.findById(userId);

    user.name = name;
    user.email = email;

    await user.save();
    const token = user.createToken();

    res.status(StatusCodes.OK).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
    /**
     * returns user: {
     *  userId: 5e63c3a5e4232e4cd0274ac2,
        name: Sam Jones,
        email: sam@gmail.com,
        role: user
     * },
     * token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
     */
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, updateUser };
