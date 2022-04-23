import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ejs from 'ejs'
import pdf from "html-pdf";
import joi from 'joi';
import path from 'path';
import userModel from '../model/userModel.js';
import { authRegister, authLogin,authProfile } from '../utility/validator.js'
import dotenv from 'dotenv';
import createError from 'http-errors';
import * as myhelper  from '../helper/functions.js';
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
                    myhelper.deleteFile(picname);
                }
                
                return createError('422', err.message);
            }
        })
        const userID=res.locals.userInfo.id;
        const role=res.locals.userInfo.role;
        let {fullname,phone,gender}=req.body;
        let userInfo={
            profile_img:picname,
            phone:phone,
            gender:gender,
            fullname:fullname
        }
       let  where={
           id:userID,
           fullname:fullname
        }
       // console.log(myhelper.updateQuery('users',userInfo,where));
       const result = await this.userModel.userProfile(userInfo,where);
       res.send(myhelper.responseAPI(result));
        
       
        } catch (err) {
            myhelper.errHandling(err,next);
        }
    }
    register = async (req, res, next) => {
        try {

            let { fullname, email, password } = req.body;
           let chekcemail = await myhelper.checkUniqueEmail(email);
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const result = await this.userModel.userRegister(fullname, email, password);
            console.log(result,'checking')
            res.send(myhelper.responseAPI(result));
        } catch (err) {
            console.log('error')
            myhelper.errHandling(err, next);
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
            res.send(await myhelper.responseAPI({ email: result[0].email, token: token }));
        } catch (err) {
            return createError(422,err);
        }
    }
    pdfGenrate = async (req,res,next)=>{
        try{
            console.log('working');
            let options = {
                "height": "5.24in",        // allowed units: mm, cm, in, px
                "width": "10.5in",            // allowed units: mm, cm, in, px
                "header": {
                    "height": "0mm"
                },
                "footer": {
                    "height": "0mm",
                },
            };
          const pdfFile=  await  ejs.render(path.join(path.resolve(), './views/',"pdf-template","invoice.ejs"), {students: 'ankul panwar'});
          pdf.create(pdfFile, options).toFile(path.join(path.resolve(),'views',"pdf/")+"invoice2.pdf", function (err, data) {
                if (err) {
                       //console.log('file not sent')
                        next(createError(422,err));
                } else {
                       //console.log('file sent')
                        //res.send(myhelper.responseAPI(data));
                        res.download(path.join(path.resolve(), 'views/pdf/invoice.pdf'), (err)=>{
                            console.log(err);
                          });
                    
                }
            });
           
        }catch(err){
            next(createError(422,err));
        }
    }

}
export default new UserController(userModel);