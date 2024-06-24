import User from "../Schema/user.js";
import UserService from "../service/user.service.js";
import BaseController from "./base.controller.js";
import * as authenticate from "../authenticate.js";
class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }

  signup = async (req, res, next) => {
    try {
      // Destructure the necessary fields from req.body
      const { firstname, lastname, username, password } = req.body;
      // Create a new User object with username, firstname, and lastname
      
      const newUser = new User({ 
        username: username,
        firstName: firstname,
        lastName: lastname
      });
  
      // Use the User.register method to register the user
      User.register(newUser, password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        } else {
          // Authenticate the user using passport
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        }
      });
    } catch (error) {
      next(error); // Pass any caught errors to the error handling middleware
    }
  }
  

  login = (req, res, next) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
};

  logout = async (req, res, next) => {
    if (req.session.user) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
      } else {
        const err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
      }
  }


}
export default UserController;