import express from 'express';
import userController from '../controller/userController.js';
import auth from '../authontication/auth.js';
const router= express.Router();
router.get('/',auth.jwtverify,userController.home)
router.post('/profile',auth.jwtverify,userController.profile)
router.post('/register',userController.register);
router.post('/login',userController.login);
export default router;