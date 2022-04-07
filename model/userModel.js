import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import bcrypt from 'bcryptjs';
import Connection from '../dbconfig/connection.js'
import { resolve } from 'url';
class UserModel extends Connection {
    constructor() {
        super();
    }

    registrDbQury = (fullname, email, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users SET ?';
            const userInfo = { fullname: fullname, email: email, password: password }
            this.conn.query(sql, userInfo, (err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    loginDbQury = async (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'select * from users where email= ?';
            this.conn.query(sql, [username, password], (err, result) => {
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