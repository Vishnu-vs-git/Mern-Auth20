import { errorHandler } from "../../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from "../../models/User.model.js";
import bcryptjs from "bcryptjs";
dotenv.config();


export const adminLogin= (req,res)=>{
  const {email,password}=req.body;
  console.log(email,password)
  if(
    email===process.env.ADMIN_EMAIL&&
    password===process.env.ADMIN_PASSWORD
  ){
    const token=jwt.sign({role:"admin"},process.env.JWT_SECRET,{
      expiresIn:"1h"
    });
    
    res
    .cookie("adminToken", token, {
      httpOnly: true,
      
      
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .status(200)
    .json({ message: "Admin logged in successfully", email });





  }else {
    res.status(401).json({message:"Invalid credentials"})
  }

}

export const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const regex = new RegExp(search, "i"); // 'i' for case-insensitive

    const users = await User.find({
      $or: [
        { username: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    }).select("-password"); // Hides password field

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};




export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("user from admin",username,email,password)

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const toggleBlockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    const status = user.isBlocked ? "blocked" : "unblocked";
    res.status(200).json({ message: `User ${status} successfully` });
  } catch (error) {
    console.error("Block/unblock error:", error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};




export const validateAdmin = (req, res) => {
  const token = req.cookies.adminToken;
  
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ authenticated: false });
    }

    res.status(200).json({ authenticated: true, admin: decoded });
  });
};









export const adminLogut=(req,res)=>{
  res.clearCookie("adminToken",{
    httpOnly:true,

  })
  res.status(200).json({message:"Logged out successfully"})
}