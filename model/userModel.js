import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import bcrypt from 'bcryptjs';
import Connection from '../dbconfig/connection.js'
import { resolve } from 'url';
import {userTable} from'../dbconfig/tables.js';
import {insertQuery,updateQuery}  from '../helper/functions.js';
class UserModel extends Connection {
    constructor() {
        super();
    }
    registrDbQury = (fullname, email, password) => {
        return new Promise((resolve, reject) => {
            const userInfo = { fullname: fullname, email: email, password: password };
            const sql=insertQuery(userInfo,userTable);
            this.conn.execute(sql,(err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    loginDbQury = (username, password) => {
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
}

export default new UserModel();