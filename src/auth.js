import dotenv from 'dotenv';
//env
dotenv.config();
  
const auth = (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: 'You are not authenticated!'});
    }else{
        next();
    }
}

// const cookieParserMiddleware = cookieParser(process.env.COOKIE_SECRET);

export default auth;
