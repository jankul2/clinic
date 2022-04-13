import joi from 'joi';
const authRegister=joi.object({
   fullname:joi.string().required(),
   email:joi.string().email().message('invalid email address!').required(),
   password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
   confrim_password: joi.ref('password'),
});
const authLogin=joi.object({
    username:joi.string().email().required().messages({
      'string.empty': `email is required!`,
      'string.email': `email is invalid!` }),
    password: joi.string().required()
 })
 const authProfile=joi.object({
  fullname:joi.string().required(),
  phone:joi.string().length(10).pattern(/^[0-9]+$/).required(),
  gender:joi.string().required(),
 });
 export{authRegister,authLogin,authProfile}