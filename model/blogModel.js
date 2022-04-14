import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import bcrypt from 'bcryptjs';
import Connection from '../dbconfig/connection.js'
import { resolve } from 'url';
import {blogTable} from'../dbconfig/tables.js';
import * as myhelper  from '../helper/functions.js';
class BlogModel extends Connection {
    constructor() {
        super();
    }
    findAll = () => {
        return new Promise((resolve, reject) => {
            const sql=myhelper.selectQuery(blogTable,{});
            this.conn.execute(sql,(err,result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    insertBlog = (userInfo) => {
        return new Promise((resolve, reject) => {
            const sql=myhelper.insertQuery(blogTable,userInfo,{});
            this.conn.execute(sql,(err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    updateBlog = (userInfo,where) => {
        return new Promise((resolve, reject) => {
            const sql=myhelper.updateQuery(blogTable,userInfo,where);
            this.conn.execute(sql,(err, result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }
    deleteBlog = (where) => {
        return new Promise((resolve, reject) => {
            const sql=myhelper.deleteQuery(blogTable,where);
            this.conn.execute(sql,(err,result) => {
                if (err) {
                    reject(createError(err.code, err.message));
                    return;
                }
                resolve(result);
            })
        })
    }

}

export default new BlogModel();