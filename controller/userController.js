import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import {responseAPI}  from '../helper/functions.js';
import dotenv from 'dotenv';
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
            let { username, password } = await req.body;
            const result = await this.userModel.loginDbQury(username,password);
           const token = await jwt.sign({data:{id:result[0].id,role:result[0].role}},process.env.SECKRET_KEY,{ expiresIn: '1h' });
            res.send(await responseAPI({email:result[0].email,token:token}));
        } catch (err) {
            err.status = err.status || 500;
            next(err);
        }
    }
}
export default new UserController(userModel);