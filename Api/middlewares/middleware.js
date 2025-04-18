import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();



export const verifyAdmin=(req,res,next)=>{
  const token=req.cookies.adminToken;
  if(!token)return res.status(401).json({message:"unauthorized"})
  
  try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role !=="admin"){
      return res.status(403).json({message:"Forbideen"})
    }
    req.admin=decoded;
    next()
  }catch(error){
    return res.status(401).json({message:"Invalid tocken"})
  }

}