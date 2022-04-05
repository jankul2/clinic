import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import bcrypt from'bcryptjs';
import Connection from '../dbconfig/connection.js'
import { resolve } from 'url';
class UserModel extends Connection {
    registrDbQury = (fullname, email, password) => {
        return new Promise((resolve, reject) => {
            const userInfo = { fullname: fullname, email: email, password: password }
            this.conn.query('INSERT INTO users SET ?', userInfo, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })

    }
    loginDbQury = async (username,password) => {
        return new Promise((resolve, reject) => {
            this.conn.query('select * from users where email= ?',[username,password], (err, result) => {
            if (err) reject(err);
             bcrypt.compare(password,result[0].password,function(error, res) {
                    if(res){
                        resolve(result);
                    }else{
                        reject(new Error('Invalid details'));
                    }
                });
                
                
                
            })
        })

    }
}

export default new UserModel();

/*const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
*/

