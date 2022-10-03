import { Router } from "express";
import { auth } from "../middleware/auth.js";
import userCtrl from "../controller/userCtrl.js";

const router = Router();

router.get("/search", auth, userCtrl.searchUser);
router.get("/users", auth, userCtrl.getUsers);
router.get("/user/:id", auth, userCtrl.getUser);
router.delete("/user/:id", auth, userCtrl.deleteUser);
router.patch("/user", auth, userCtrl.updateUser);
router.patch("/user/:id/friend", auth, userCtrl.friend);
router.patch("/user/:id/unfriend", auth, userCtrl.unfriend);

export default router;
