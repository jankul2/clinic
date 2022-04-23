import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import bcrypt from 'bcryptjs';
import Connection from '../dbconfig/connection.js'
import {userTable} from'../dbconfig/tables.js';
import * as myhelper  from '../helper/functions.js';
import EmailSend from '../authontication/email.js'
import ejs from 'ejs';

class UserModel extends Connection {
    constructor() {
        super();
    }
    userProfile = (userInfo,where) => {
        return new Promise((resolve, reject) => {
            const sql=myhelper.updateQuery(userTable,userInfo,where);
            this.conn.execute(sql,(err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    userRegister = (fullname, email, password) => {
        return new Promise((resolve, reject) => {
            const userInfo = { fullname: fullname, email: email, password: password };
            console.log('check')
            const sql=myhelper.insertQuery(userTable,userInfo);
            this.conn.execute(sql,(err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
               
              this.emailTemplate(fullname,email).then(emailtemplate => {
                    let sendEmail=EmailSend.registrationEmail(email,userInfo,emailtemplate);
                    resolve(result);
                  }).catch(err=>{
                    reject(createError(402,err));
                    return;
                  }); 
                
            })
        })
    }
    userLogin = (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'select * from '+userTable+' where email= ?';
            this.conn.execute(sql,[username], (err, result, fields) => {
                //console.log(result)
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                bcrypt.compare(password, result[0].password, function (error, res) {
                    if (res) {
                        resolve(result);
                    } else {
                        reject(createError(402, 'invalid details'));
                        return;
                    }
                });
            })
        })
    }
    emailTemplate=(fullname,email)=>{
       return  ejs.renderFile(path.join(path.resolve(),'/views/email-template/mail.ejs'),{
            user_firstname: fullname,
            confirm_link: "http://www.8link.in/confirm=" + email
          })
    }
    
}

export default new UserModel();