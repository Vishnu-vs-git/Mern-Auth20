import express from 'express';
import { signin, signup, updatedProfilePic } from '../../controllers/auth/auth.controller.js';
import { updateProfileInfo } from '../../controllers/user/userController.js';
const router= express.Router();

router.post("/signup",signup)
router.post('/signin',signin)
router.put('/update-profile-pic/:id',updatedProfilePic)
router.put('/update-profile-info/:id',updateProfileInfo)





export default router;
