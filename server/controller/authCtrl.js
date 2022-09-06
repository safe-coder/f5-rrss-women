import Users from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authCtrl = {
  register: async (req, res) => {
    try {
        const {fullname, username, email, password, gender} = req.body;

        const newUsername = username.toLowerCase().replace(/ /g,'');
        
        const user_name = await Users.findOne({username: newUsername})
        if (user_name) return res.status(400).json({msg: 'this username already exists'})

        const Email = await Users.findOne({email: email})
        if(Email) return res.status(400).json({msg: 'this email already exists'})

        if(password.length < 6) return res.status(400).json({msg: "password must be atleast 6 characters long"})

        const passwordHash = await bcrypt.hash(password,13);

        const newUser = new Users({
            fullname, username:newUsername ,email, password:passwordHash, gender
        })
        
        
     
        await newUser.save();

        res.json({
            msg:"registerd sucess",
            user:{
            ...newUser._doc,
            password:''
            }
        })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccesToken: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;
