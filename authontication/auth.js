import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createError from 'http-errors';
dotenv.config();
 class Auth{
 static jwtverify=(req,res,next)=>{
     const token = req.headers.authorization.split('bearer')[1].trim();
     console.log(token)
     if (!token) {
        next(createError(403,'A token is required for authentication'));
      }
      try {
        const decoded = jwt.verify(token,process.env.SECKRET_KEY);
        req.userInfo = decoded.data;
        console.log(req.body);
      } catch (err) {
        next(createError(402,'token is invalid'));
      }
    next();

 }
}
export default Auth;
