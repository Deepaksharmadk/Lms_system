import { Router } from "express";
const router = Router();
import app from "../app.js";
import { userRegister } from "../controller/user.controller.js";
router.route("/register").post(userRegister);

export default router;
