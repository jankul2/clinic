import express from 'express';
import createError from 'http-errors';
import path from 'path';
import route from './routes/route.js';
const port= process.env.port || 8000
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);
app.use((req,res,next)=>{
    next(createError(404,'page not found!'));
});
app.use((err,req,res,next)=>{
    res.status(err.status);
    res.send({error:{status:err.status,message:err.message}});
});
app.listen(port,()=>console.log(`server is working on http:${port}`));
