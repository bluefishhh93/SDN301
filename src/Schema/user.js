import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },  
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
export { User as default, userSchema };
