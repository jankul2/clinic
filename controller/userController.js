import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import userModel from '../model/userModel.js';
import {responseAPI}  from '../helper/functions.js';
import {authRegister,authLogin} from '../utility/validator.js'
import dotenv from 'dotenv';
import createError from 'http-errors';
dotenv.config();
class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    home=(req,res,next)=>{
       
        res.send(responseAPI(req.body));
    }
    register = async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            let { fullname,email,password } = req.body;
            password = await bcrypt.hash(password, salt);
            const result = await this.userModel.registrDbQury(fullname, email,password);
            res.send(responseAPI(result));
        } catch (err) {
            next(err);
        }
    }
    login = async (req, res, next) => {
        try {
            
            const validator= await authLogin.validateAsync(req.body,(err,value)=>{
                if(err){
                    return createError('422',err.message);
                }
            });
            let { username, password } = await req.body;
            const result = await this.userModel.loginDbQury(username,password);
           const token = await jwt.sign({data:{id:result[0].id,role:result[0].role}},process.env.SECKRET_KEY,{ expiresIn: '1h' });
            res.send(await responseAPI({email:result[0].email,token:token}));
        } catch (err) {
            if(err.isJoi==true){
                err.status='422';
            }
            err.status = err.status || 500;
            next(err);
        }
    }
}
export default new UserController(userModel);