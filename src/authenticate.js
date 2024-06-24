import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./Schema/user.js";
import JwtStrategy from "passport-jwt/lib/strategy.js";
import ExtractJwt from "passport-jwt/lib/extract_jwt.js";
import jwt from "jsonwebtoken";
//env
import dotenv from "dotenv";
// dotenv.config({ path: './src/.env' });
dotenv.config();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export const getToken = (user) => {
    return jwt.sign(
      { _id: user._id, admin: user.admin }, // Include the user's admin status in the payload
      process.env.SECRET_KEY,
      { expiresIn: 3600 }
    );
  };

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

export const jwtPassport = passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

export const verifyUser = passport.authenticate("jwt", { session: false });
