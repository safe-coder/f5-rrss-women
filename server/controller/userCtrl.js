import { Users } from "../model/userModel.js";

 export const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")

      res.json({ users })


    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUser: async (req,res)=>{
      try {
          const user =  await Users.findOne({_id : req.params.id})
          .select("-password").populate("friends following" , "-password") 
          if(!user) return res.status(400).json({msg: "No user Exists"})
          res.json({user})
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  },
};

