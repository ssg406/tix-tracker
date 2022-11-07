import express from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/register').post((req, res, next) => {
    registerUser();
});

authRouter.route('/login').post((req, res, next) => {
    loginUser();
});

authRouter.route('/updateUser').patch((req, res, next) => {
    updateUser();
})

export default authRouter;