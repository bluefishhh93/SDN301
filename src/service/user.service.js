import BaseService from "./base.service.js";
import User from "../Schema/user.js";

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  signup = async (username, password) => {
    const existingUser = await this.model.findOne({ username : username });
    if (existingUser) {
      const err = new Error(`User ${username} already exists!`);
      err.status = 403;
      throw err;
    }

    const newUser = await this.create({ username, password });
    return { status: "Registration Successful!", user: newUser };
  };

  login = async (username, password) => {
    const user = await this.model.findOne({ username : username });

    if (!user) {  
      const err = new Error(`User ${username} does not exist!`);
      err.status = 403;
      return { error: err };
    }

    if (user.password !== password) {
      const err = new Error("Your password is incorrect!");
      err.status = 403;
      return { error: err };
    }

    return { user };
  };
}

export default UserService;