import express from 'express';
import { signin, signup, updatedProfilePic } from '../../controllers/auth/auth.controller.js';
import { updateProfileInfo } from '../../controllers/user/userController.js';
import { verifyUser } from '../../middlewares/middleware.js';
const router= express.Router();

router.post("/signup",signup)
router.post('/signin',signin)
router.put('/update-profile-pic/:id',verifyUser,updatedProfilePic)
router.put('/update-profile-info/:id',verifyUser,updateProfileInfo)





export default router;
