import User from "../../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user created successfuly" });
  } catch (error) {
    console.log("hello", error);
    next(error);
  }
};
