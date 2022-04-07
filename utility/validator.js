import joi from 'joi';
const authRegister=joi.object({
   fullname:joi.string().required(),
   email:joi.string().email().message('invalid email address!').required(),
   password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
   confrim_password: joi.ref('password'),
});
const authLogin=joi.object({
    email:joi.string().email().message('invalid email address!').required(),
    password: joi.string().required(),
 })
 export{authRegister,authLogin}