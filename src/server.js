import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import errorHandler from "./errorHandler.js";
import session from "express-session";
import FileStore from 'session-file-store';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import authenticate  from "passport";

//router
import promotionRouter from "./router/promotion.router.js";
import dishRouter from "./router/dish.router.js";
import genreRouter from "./router/genre.router.js";
import bookRouter from "./router/book.router.js";
import userRouter from "./router/user.router.js";
import leaderRouter from "./router/leader.router.js";
import commentRouter from "./router/comment.router.js";
// import auth from "./auth.js";
import auth from "./auth.js";



import { jwtPassport } from "./authenticate.js";

// dotenv.config({ path: './src/.env' });
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Set up session management with express-session and session-file-store
app.use(session({
  name: 'session-id',
  secret: process.env.SESSION_SECRET || 'default-secret', // Use environment variable for secret
  saveUninitialized: false,
  resave: false,
  store: new (FileStore(session))() // Initialize FileStore
}));

// Middleware to parse cookies with a secret
const cookieParserMiddleware = cookieParser(process.env.COOKIE_SECRET || 'default-cookie-secret');
app.use(cookieParserMiddleware);


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
const url = "mongodb://localhost:27017/promotions";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error caonnecting to MongoDB', err);
  process.exit(1); // Exit the process with a failure code
});

//TODO: ROUTER ============================================================

app.use("/api/users",userRouter)
// app.use(auth);
app.use("/api/promotions",promotionRouter);
app.use("/api/dishes", dishRouter);
app.use("/api/genres", genreRouter);
app.use("/api/books",bookRouter)
app.use("/api/leaders",leaderRouter);
app.use("/api/comments",commentRouter);

//TODO:        ============================================================

// Middleware xử lý lỗi
app.use(errorHandler);

app.all('*',(req, res, next) => {
    if(req.secure){
      return next();
    }else{
      res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }
})




export default app;