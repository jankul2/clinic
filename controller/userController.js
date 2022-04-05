import mysql2 from 'mysql2';
import bcrypt from'bcryptjs';
import userModel from '../model/userModel.js';
class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    register = async(req,res,next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            let {fullname,email,password}=req.body;
            password = await bcrypt.hash(password, salt);
            const result = await this.userModel.registrDbQury(fullname,email,password);
            res.send(result);
        } catch (err) {
            err.status=403;
            next(err);
        }
    }
    login = async(req,res,next) => {
            try {
                let {username,password} = await req.body;
                const result = await this.userModel.loginDbQury(username,password);
                res.send(result);
            } catch (err) {
                err.status=401;
                next(err);
            }    



    }
}
export default new UserController(userModel);