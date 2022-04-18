import express from 'express';
import userController from '../controller/userController.js';
import blogController from '../controller/blogController.js';
import auth from '../authontication/auth.js';
const router= express.Router();
router.get('/',auth.jwtverify,blogController.findAll);
router.post('/profile',[auth.jwtverify,auth.uploadedInfo],userController.profile)
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/addblog',[auth.jwtverify,auth.uploadedInfo],blogController.add);
router.patch('/updateblog/:id',[auth.jwtverify,auth.uploadedInfo],blogController.update);
router.delete('/deleteblog/:id',[auth.jwtverify],blogController.delete);
export default router;