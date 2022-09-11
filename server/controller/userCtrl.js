import { Users } from "../model/userModel.js";

 export const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")

      res.json({ users })


    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
};

