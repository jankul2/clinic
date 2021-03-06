import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createError from 'http-errors';
import {imageUpload} from '../authontication/schmaUpload.js'
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
        res.locals.userInfo=decoded.data;
        next();
      }
      } catch (err) {
        next(createError(402,'token is invalid'));
      }
   

 }
 static uploadedInfo = async(req,res,next)=> {
  const uploadinfo = imageUpload.single('profile_picture'); 
 
    uploadinfo(req, res, function (err) {
      if (err) {
          next(createError(500,err.message));  
          return ;
      } 
      if (req.file== undefined) {
        next(createError(500,'image field is required !'));  
        return ;
    }
      if(!req.file || Object.keys(req.file).length==0){
          next(createError(402,'image is required!'));   
      }
      //console.log(req.file,'papa')
      res.locals.filename=req.file.filename;
      next();
  })
    

}

}
export default Auth;