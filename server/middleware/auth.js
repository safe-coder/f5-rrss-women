import { Users } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "not valid" });

    const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    if (!decoded) return res.status(500).json({ msg: "not valid" });

    const user = await Users.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
