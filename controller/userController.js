import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import userModel from '../model/userModel.js';
import { responseAPI, checkUniqueEmail, errHandling,deleteFile} from '../helper/functions.js';
import { authRegister, authLogin,authProfile } from '../utility/validator.js'
import dotenv from 'dotenv';
import createError from 'http-errors';
dotenv.config();
class UserController {
    constructor(userModel) {
        this.userModel = userModel;

    }
    home = (req, res, next) => {
        res.send(responseAPI({ content: 'Welcome to Dashboard !' }));
    }
    profile = async (req, res, next) => {
        try {
        let picname=res.locals.filename;
        const validator = await authProfile.validateAsync(req.body, (err, value) => {
            if (err) {
                if(picname.length > 0){
                    deleteFile(picname);
                }
                
                return createError('422', err.message);
            }
        })
     
       const result = await this.userModel.userProfile(req.body.fullname,picname);
       res.send(responseAPI(result));
        
       
        } catch (err) {
            errHandling(err,next);
        }
    }
    register = async (req, res, next) => {
        try {

            let { fullname, email, password } = req.body;
            let chekcemail = await checkUniqueEmail(email);
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const result = await this.userModel.userRegister(fullname, email, password);
            res.send(responseAPI(result));
        } catch (err) {
            errHandling(err, next);
        }
    }
    login = async (req, res, next) => {
        try {
            const validator = await authLogin.validateAsync(req.body, (err, value) => {
                if (err) {
                    return createError('422', err.message);
                }
            });
            let { username, password } = await req.body;
            const result = await this.userModel.userLogin(username, password);
            const token = await jwt.sign({ data: { id: result[0].id, role: result[0].role } }, process.env.seckret_key, { expiresIn: '1h' });
            res.send(await responseAPI({ email: result[0].email, token: token }));
        } catch (err) {
            errHandling(err, next)
        }
    }
}
export default new UserController(userModel);