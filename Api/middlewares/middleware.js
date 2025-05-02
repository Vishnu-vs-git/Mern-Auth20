import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.adminToken;
  console.log(token)
  
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden" });
    }
    console.log(decoded)
    req.admin = decoded;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired.' });
      }
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    // Attach decoded info (like user ID) to the request object
    req.user = decoded;
    next();
  });
};