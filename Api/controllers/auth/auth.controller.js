import User from "../../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
     const existingUser = await User.findOne({ email });
        if (existingUser)
          return res.status(400).json({ success:false,message: "User already exists" });
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user created successfuly" });
  } catch (error) {
   
    next(error);
  }
};

export const signin= async(req,res,next) =>{
  try{
    console.log("admin from hello")
    const{email,password}=req.body;
    console.log("Email,pass word is",email,password)
    const validUser=await User.findOne({email});
    console.log("valid user is",validUser)
    if(!validUser) return next(errorHandler(404,'User not found'));
    const validPassword= bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,'wrong credentials'));
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const{password:hashedPassword,...rest}=validUser._doc;
    const expiryDate= new Date(Date.now()+3600000)//=====> for one hour
    res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)

  }catch(error){
    next(error)
  }
}

export const updatedProfilePic=async(req,res)=>{
  try{
    const userId=req.params.id;
    const {profilePicture}=req.body;
    const updatedUser=await User.findByIdAndUpdate(
      userId,
      {profilePicture},
      {new:true}
    )
    res.status(203).json({profilePicture:updatedUser.profilePicture})
  }catch(error){
    next(error)
  }
}
