import express from "express";
import UsersController from "../controller/user.controller.js";
import passport from "passport";
import { verifyUser } from "../authenticate.js";
import { isAdmin } from "../middleware/index.js";
const userRouter = express.Router();


const userController = new UsersController();

// userRouter.post('/signup', usersController.signup);
// userRouter.post('/login', usersController.login);
// userRouter.get('/logout', usersController.logout);
userRouter.get('/', verifyUser, isAdmin, (req, res, next) => {
   userController.getAll(req, res, next)
})
userRouter.post('/signup', userController.signup);
userRouter.post('/login', passport.authenticate('local'), userController.login);

export default userRouter;