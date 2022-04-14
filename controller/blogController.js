import mysql2 from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import blogModel from '../model/blogModel.js';
import { blogAuth } from '../utility/validator.js'
import dotenv from 'dotenv';
import createError from 'http-errors';
import * as myhelper from '../helper/functions.js';
dotenv.config();
class BlogController {
    constructor(blogModel) {
        this.blogModel = blogModel;
        
    }
    findAll = async (req, res, next) => {
        try {
         const id= req.params.id;
         const result = await this.blogModel.findAll();
        res.send(await myhelper.responseAPI(result));

        } catch (err) {
            myhelper.errHandling(error,next);
        }
    }
    add = async (req, res, next) => {
        try {
            let picname = res.locals.filename;
            const userID = res.locals.userInfo.id;
            let { post_name, post_content, category } = req.body;
            const validator = await blogAuth.validateAsync(req.body, (err, value) => {
                if (err) {
                    if (picname.length > 0) {
                        myhelper.deleteFile(picname);
                    }
                    return createError(422, err.message)
                }
            });
            const blogInfo = {
                post_name: post_name,
                post_content: post_content,
                category: (category == "" || category == undefined) ? 0 : category,
                profile_img: picname,
                author_id: userID,
                register_post: myhelper.currentDate()
            }
            //console.log(blogInfo)
            const result = await this.blogModel.insertBlog(blogInfo);
            res.send(await myhelper.responseAPI(result));
        } catch (error) {
            myhelper.errHandling(error, next);
        }
    }
    update = async (req, res, next) => {
        try {
            let picname = res.locals.filename;
            const userID = res.locals.userInfo.id;
            let { post_name, post_content, category } = req.body;
            const validator = await blogAuth.validateAsync(req.body, (err, value) => {
                if (err) {
                    if (picname.length > 0) {
                        myhelper.deleteFile(picname);
                    }
                    return createError(422, err.message)
                }
            });
            const blogInfo = {
                post_name: post_name,
                post_content: post_content,
                category: (category == "" || category == undefined) ? 0 : category,
                profile_img: picname,
                author_id: userID,
                register_post: myhelper.currentDate()
            }
            const where = {
                id: req.params.id
            }
            console.log(blogInfo)
            const result = await this.blogModel.updateBlog(blogInfo, where);
            res.send(await myhelper.responseAPI(result));
        } catch (error) {
            myhelper.errHandling(error, next);
        }
    }
    delete = async (req, res, next) => {
        try {
            const where = {
                id: req.params.id
            }
            const result = await this.blogModel.deleteBlog(where);
            res.send(await myhelper.responseAPI(result));
        } catch (error) {
            myhelper.errHandling(error, next);
        }
    }
}
export default new BlogController(blogModel);