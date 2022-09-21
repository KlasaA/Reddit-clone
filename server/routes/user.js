import express from "express";
import {
  signUp,
  signIn,
  forgotPassword,
  changeUserInfo,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);


router.post("/forgot-password", forgotPassword);
router.put("/change-user-info", changeUserInfo);

export default router;
