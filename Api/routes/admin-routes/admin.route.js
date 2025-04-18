import express from 'express';
import { adminLogin, adminLogut, createUser, deleteUser, getAllUsers, toggleBlockUser, updateUser, validateAdmin } from '../../controllers/admin/adminController.js';
import { verifyAdmin } from '../../middlewares/middleware.js';

const router= express.Router();

router.post("/login",adminLogin)
router.get("/users",verifyAdmin,getAllUsers)
router.post("/create-user",verifyAdmin,createUser)
router.put("/edit-user/:id",verifyAdmin,updateUser)
router.delete("/delete-user/:id",verifyAdmin,deleteUser)
router.patch("/toggle-block-user/:id",verifyAdmin,toggleBlockUser)
router.get("/logout",verifyAdmin,adminLogut)
router.get("/validate",verifyAdmin,validateAdmin)


export default router;
        