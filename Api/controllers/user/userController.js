import User from "../../models/User.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

export const updateProfileInfo = async(req, res) => {
  try {
    
    const { id } = req.params;
    const { username, email } = req.body;
console.log("123-----")
    const updateduser=await User.findByIdAndUpdate(id,{username,email},{new:true})
    console.log("udated user",updateduser)
    if(!updateduser)res.status(500).json({error:"Error in updating user"})

      res.status(203).json({username,email})

  } catch (error) {
     next(error)
  }
};
