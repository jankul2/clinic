import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createError from 'http-errors';
dotenv.config();
 class Auth{
 static jwtverify=(req,res,next)=>{
  try {
     const tokenHeader = req.headers.authorization;
     if (!tokenHeader) {
        next(createError(403,'A token is required for authentication'));
      }else{
        const token = tokenHeader.split('bearer')[1].trim();
        const decoded = jwt.verify(token,process.env.SECKRET_KEY);
        req.userInfo = decoded.data;
      }
      } catch (err) {
        next(createError(402,'token is invalid'));
      }
   

 }
}
export default Auth;
