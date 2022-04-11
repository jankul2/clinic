import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createError from 'http-errors';
dotenv.config();
 class Auth{
 static jwtverify= async(req,res,next)=>{
  try {
     const tokenHeader = await req.headers.authorization;
     if (!tokenHeader) {
        next(createError(403,'A token is required for authentication'));
      }else{
        const token =  await tokenHeader.split('Bearer')[1].trim();
        const decoded = await jwt.verify(token,process.env.seckret_key);
        req.userInfo = decoded.data;
        next();
      }
      } catch (err) {
        next(createError(402,'token is invalid'));
      }
   

 }
 static profileImg= async(req,res,next)=>{
  try {
     
      } catch (err) {
        
      }
   

 }
}
export default Auth;
