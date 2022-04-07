import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    register = async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            let { fullname,email,password } = req.body;
            password = await bcrypt.hash(password, salt);
            const result = await this.userModel.registrDbQury(fullname, email,password);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
    login = async (req, res, next) => {
        try {
            let { username, password } = await req.body;
            const result = await this.userModel.loginDbQury(username,password);
            if (result.length > 0) {
                //const token =await jwt.sign()
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}
export default new UserController(userModel);